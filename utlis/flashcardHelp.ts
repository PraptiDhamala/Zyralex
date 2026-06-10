import { Lesson } from "../constants/lessonData";
import { FlashCARD } from "../models/flashcard";

export const createFlashCards = (lesson: Lesson): FlashCARD[] => {
  const recognition = lesson.signs.map((sign): FlashCARD => ({
    mode: "imageToWord",   
    question: "What does this sign mean?",
    answer: sign.label,
    image: sign.image,
    video: sign.video,
    hint: sign.hint,
  }));

  const recall = lesson.signs.map((sign): FlashCARD => ({
    mode: "wordToImage",   
    question: `How do you sign "${sign.label}"?`,
    answer: sign.label,
    image: sign.image,
    video: sign.video,
    hint: sign.hint,
  }));

  return [...recognition, ...recall];
};
