import { Platform } from "react-native";
import { buildUrls } from "./serverConfig";

export async function fetchSyllables(serverIp: string, word: string) {
  const { base } = buildUrls(serverIp);
  const res = await fetch(`${base}/api/syllables`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word }),
  });
  if (!res.ok) throw new Error("Syllable lookup failed");
  return res.json() as Promise<{ word: string; syllables: string[] }>;
}

export async function scanFlashcard(serverIp: string, photoUri: string) {
  const { base } = buildUrls(serverIp);
  const formData = new FormData();

  if (Platform.OS === "web") {
    const blob = await (await fetch(photoUri)).blob();
    formData.append("file", blob, "flashcard.jpg");
  } else {
    formData.append("file", {
      uri: photoUri,
      name: "flashcard.jpg",
      type: "image/jpeg",
    } as any);
  }

  const res = await fetch(`${base}/api/ocr`, {
    method: "POST",
    body: formData as any,
  });
  if (!res.ok) throw new Error("OCR scan failed");
  return res.json() as Promise<{ raw_text: string; word: string }>;
}
