import * as Speech from "expo-speech"

export const speakWord = async (word: string) => {
  Speech.speak(word, {
    language: "en-US",
    pitch: 1,
    rate: 0.8,
  })
}