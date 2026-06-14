import time
import re

class WordTracker:
    def __init__(self, distraction_threshold=3.0, fixation_threshold=2.5):
    
        # distraction_threshold: seconds before prompting user to focus
        # fixation_threshold: seconds on a single word before offering syllable help
        
        self.distraction_threshold = distraction_threshold
        self.fixation_threshold = fixation_threshold
        
        # State tracking vars
        self.last_seen_time = time.time()
        self.current_word_index = None
        self.word_hover_start_time = None
        self.words_metadata = []

    def load_text_coordinates(self, words_with_boxes):
        # """
        # Receives a list of dicts representing the text layout on the screen UI.
        # Example item: {'word': 'dyslexia', 'x1': 100, 'y1': 50, 'x2': 220, 'y2': 90}
        # """
        self.words_metadata = words_with_boxes

    def syllable_breakdown(self, word):
        # """
        # Logic to break a word down into syllables for intervention.
        # Can be expanded with dictionary rules, but here is a procedural regex fallback.
        # """
        # Clean the word from punctuation
        clean_word = re.sub(r'[^\w]', '', word).lower()
        
        # Simple rule-based syllable splitting engine for visualization 
        # (For production, consider using a library like 'syllables' or 'pyphen')
        rules = r'(?:[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?)'
        syllables = re.findall(rules, clean_word)
        
        if not syllables or len(syllables) == 1:
            return word # Can't break down further easily
        
        return " - ".join(syllables)

    def update_gaze(self, gaze_x, gaze_y, face_detected=True):
        # """
        # Call this function inside your frame loop in server.py / gaze_detection.py
        # Returns: Dict containing action prompts if triggered, else None.
        # """
        current_time = time.time()

        # 1. Check for distraction
        if not face_detected:
            if current_time - self.last_seen_time > self.distraction_threshold:
                return {
                    "status": "distracted",
                    "message": "Hey! Please look back at the screen to continue your lesson! ✨"
                }
            return None

        # If face is found, reset distraction timer
        self.last_seen_time = current_time

        # 2. Check which word the user is currently looking at
        looking_at_word_idx = None
        for idx, w in enumerate(self.words_metadata):
            if w['x1'] <= gaze_x <= w['x2'] and w['y1'] <= gaze_y <= w['y2']:
                looking_at_word_idx = idx
                break

        # 3. Track Fixation
        if looking_at_word_idx is not None:
            # If they just started looking at this word
            if self.current_word_index != looking_at_word_idx:
                self.current_word_index = looking_at_word_idx
                self.word_hover_start_time = current_time
            else:
                # If they have been staring at the same word
                duration = current_time - self.word_hover_start_time
                if duration >= self.fixation_threshold:
                    target_word = self.words_metadata[looking_at_word_idx]['word']
                    broken_word = self.syllable_breakdown(target_word)
                    
                    # Reset timer so it doesn't trigger repeatedly every frame
                    self.word_hover_start_time = current_time 
                    
                    return {
                        "status": "fixated",
                        "word": target_word,
                        "syllables": broken_word,
                        "message": f"Struggling with '{target_word}'? Let's break it down: {broken_word}"
                    }
        else:
            # User is looking at the screen, but not at a tracked text block
            self.current_word_index = None
            self.word_hover_start_time = None

        return None