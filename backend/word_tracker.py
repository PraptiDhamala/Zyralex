import time
import re

class WordTracker:
    def __init__(self, distraction_threshold=3.0, fixation_threshold=2.5):
    
      
        self.distraction_threshold = distraction_threshold
        self.fixation_threshold = fixation_threshold
        
        self.last_seen_time = time.time()
        self.current_word_index = None
        self.word_hover_start_time = None
        self.words_metadata = []

    def load_text_coordinates(self, words_with_boxes):
       
        self.words_metadata = words_with_boxes

    def syllable_breakdown(self, word):
      
        clean_word = re.sub(r'[^\w]', '', word).lower()
        rules = r'(?:[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?)'
        syllables = re.findall(rules, clean_word)
        
        if not syllables or len(syllables) == 1:
            return word # Can't break down further easily
        
        return " - ".join(syllables)

    def update_gaze(self, gaze_x, gaze_y, face_detected=True):
        current_time = time.time()

        if not face_detected:
            if current_time - self.last_seen_time > self.distraction_threshold:
                return {
                    "status": "distracted",
                    "message": "Hey! Please look back at the screen to continue your lesson!"
                }
            return None

        self.last_seen_time = current_time

        looking_at_word_idx = None
        for idx, w in enumerate(self.words_metadata):
            if w['x1'] <= gaze_x <= w['x2'] and w['y1'] <= gaze_y <= w['y2']:
                looking_at_word_idx = idx
                break

        if looking_at_word_idx is not None:
            # If they just started looking at this word
            if self.current_word_index != looking_at_word_idx:
                self.current_word_index = looking_at_word_idx
                self.word_hover_start_time = current_time
            else:
                duration = current_time - self.word_hover_start_time
                if duration >= self.fixation_threshold:
                    target_word = self.words_metadata[looking_at_word_idx]['word']
                    broken_word = self.syllable_breakdown(target_word)
                    
                    self.word_hover_start_time = current_time 
                    
                    return {
                        "status": "fixated",
                        "word": target_word,
                        "syllables": broken_word,
                        "message": f"Struggling with '{target_word}'? Let's break it down: {broken_word}"
                    }
        else:
            self.current_word_index = None
            self.word_hover_start_time = None

        return None