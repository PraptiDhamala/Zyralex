// services/voice.ts

interface SpeechConfig {
  targetText: string;
  onTranscriptUpdate: (text: string) => void;
  onComplete: (result: EvaluationResult) => void; 
}

export type EvaluationResult = "well_done" | "slow" | "rushed" | "keep_trying";

// Keep track of the active instance and timing cleanly
let recognitionInstance: any = null;
let startTime: number | null = null;
let accumulatedTranscript = ''; // Safely hold the transcript globally during the session

export const startListening = (config: SpeechConfig) => {
  if (typeof window === 'undefined') return;
  
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
    return;
  }

  // Clean up any rogue running instances first
  if (recognitionInstance) {
    try { recognitionInstance.abort(); } catch(e){}
  }

  recognitionInstance = new SpeechRecognition();
  recognitionInstance.continuous = true;
  recognitionInstance.interimResults = true;
  recognitionInstance.lang = 'en-US';

  accumulatedTranscript = '';
  startTime = performance.now();

  recognitionInstance.onresult = (event: any) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript + ' ';
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    accumulatedTranscript += finalTranscript;
    
    // Combine them properly so the user sees live updates AND final history
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
    } catch(e){
      console.log("Error stopping recognition", e);
    }
  }

  const endTime = performance.now();
  const durationInSeconds = startTime ? (endTime - startTime) / 1000 : 0;

  // 1. Clean and tokenize strings into word arrays
  const cleanString = (str: string) => str.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").trim();
  
  const targetWords = cleanString(targetText).split(/\s+/).filter(Boolean);
  const spokenWords = cleanString(accumulatedTranscript).split(/\s+/).filter(Boolean);

  if (spokenWords.length === 0 || targetWords.length === 0) return "keep_trying";

  // 2. Track Word Accuracy
  let matchedWordCount = 0;
  targetWords.forEach(targetWord => {
    if (spokenWords.includes(targetWord)) {
      matchedWordCount++;
    } else {
      const looseMatch = spokenWords.some(spokenWord => 
        spokenWord.startsWith(targetWord.substring(0, Math.max(3, targetWord.length - 2))) ||
        targetWord.startsWith(spokenWord.substring(0, Math.max(3, spokenWord.length - 2)))
      );
      if (looseMatch) matchedWordCount++;
    }
  });

  const accuracyRate = matchedWordCount / targetWords.length; 
  const wpm = durationInSeconds > 0 ? (spokenWords.length / durationInSeconds) * 60 : 0;

  console.log(`[Mimo Engine] Final Accuracy: ${(accuracyRate * 100).toFixed(0)}% | WPM: ${wpm.toFixed(0)}`);

  // ─── Expanded Evaluation Matrix ──────────────────────────────────────────

  // Condition 1: Great accuracy, but speed is too slow (Struggling/Hesitant reader)
  if (accuracyRate >= 0.75 && wpm < 55) {
    return "slow";
  }

  // Condition 2: High Accuracy at a solid, fluent pace
  if (accuracyRate >= 0.75 && wpm >= 55) {
    return "well_done";
  }

  // Condition 3: Fast pace, but skipped/mismeasured too many words (Rushed reader)
  if (accuracyRate < 0.75 && wpm > 90) {
    return "rushed";
  }

  // Condition 4: Low accuracy and low speed (Stuck completely)
  return "keep_trying";
};