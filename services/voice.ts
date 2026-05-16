import Voice from '@react-native-voice/voice';

export const startListening = (onResult: (text: string) => void) => {
  Voice.onSpeechResults = (e: any) => {
    const text = e.value?.[0] || "";
    onResult(text);
  };

  Voice.onSpeechError = (e: any) => {
    console.log("VOICE ERROR:", e);
  };

  Voice.start("en-US");
};