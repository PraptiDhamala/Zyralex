// services/voice.ts

interface SpeechConfig {
  targetText: string;
  onTranscriptUpdate: (text: string) => void;
  onComplete: (result: EvaluationResult) => void;
}

export type EvaluationResult =
  | "well_done"
  | "rushed"
  | "keep_trying"
  | "no_speech";

// Keep track of the active instance and transcript
let recognitionInstance: any = null;
let accumulatedTranscript = "";

export const startListening = (config: SpeechConfig) => {
  if (typeof window === "undefined") return;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
    return;
  }

  // Clean up any existing instance
  if (recognitionInstance) {
    try {
      recognitionInstance.abort();
    } catch (e) {}
  }

  recognitionInstance = new SpeechRecognition();
  recognitionInstance.continuous = true;
  recognitionInstance.interimResults = true;
  recognitionInstance.lang = "en-US";

  accumulatedTranscript = "";

  recognitionInstance.onresult = (event: any) => {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + " ";
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    accumulatedTranscript += finalTranscript;

    const totalCurrentSpeech = (accumulatedTranscript + interimTranscript).trim();
    config.onTranscriptUpdate(totalCurrentSpeech);
  };

  recognitionInstance.onerror = (event: any) => {
    console.error("[Speech Error]", event.error);
  };

  recognitionInstance.start();
};

export const stopListening = (targetText: string): EvaluationResult => {
  if (recognitionInstance) {
    try {
      recognitionInstance.stop();
    } catch (e) {
      console.log("Error stopping recognition", e);
    }
  }

  const cleanString = (str: string) =>
    str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .trim();

  const targetWords = cleanString(targetText).split(/\s+/).filter(Boolean);
  const spokenWords = cleanString(accumulatedTranscript).split(/\s+/).filter(Boolean);

  // Case 1: No speech detected
  if (spokenWords.length === 0) {
    return "no_speech";
  }

  // Case 2: Perfect strict sequence match
  const isExactMatch =
    spokenWords.length === targetWords.length &&
    targetWords.every((word, i) => spokenWords[i] === word);

  if (isExactMatch) {
    return "well_done";
  }

  // Case 3: Some words matched but sequence broken
  const someMatch = targetWords.some((word, i) => spokenWords[i] === word);
  if (someMatch) {
    return "keep_trying";
  }

  // Case 4: No words matched at all
  return "rushed";
};
