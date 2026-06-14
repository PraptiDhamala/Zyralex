import re

class InterventionEngine:
    def __init__(self):
        # A dictionary dictionary fallback for words that are notoriously hard to split algorithmically
        self.custom_dictionary = {
            "dyslexia": ["dys", "lex", "i", "a"],
            "intervention": ["in", "ter", "ven", "tion"],
            "reading": ["read", "ing"]
        }

    def get_syllables(self, word):
        """
        Splits a word into its phonetic syllable components.
        Checks custom dictionary first, then applies linguistic rules.
        """
        clean_word = re.sub(r'[^\w]', '', word).lower()
        
        # Check explicit dictionary first
        if clean_word in self.custom_dictionary:
            return self.custom_dictionary[clean_word]
            
        # Fallback procedural regex rule (Vowel-Consonant structures)
        # Matches typical patterns for English vowel segments
        syllables = re.findall(r'(?:[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?)', clean_word)
        
        return syllables if syllables else [word]

    def format_syllable_breakdown(self, word, style="hyphen"):
        """
        Intervention 1: Visual Syllable Splits
        Styles available: 'hyphen' (dys-lex-i-a) or 'color' (wrapped in alternating HTML tags)
        """
        syllables = self.get_syllables(word)
        
        if style == "hyphen":
            return "-".join(syllables)
            
        elif style == "color":
            # Alternates colors between red and blue to help tracking across phone boundaries
            colors = ["#FF4B4B", "#1C6DD0"]
            colored_word = ""
            for i, syl in enumerate(syllables):
                color = colors[i % 2]
                colored_word += f'<span style="color: {color}; font-weight: bold;">{syl}</span>'
            return colored_word
            
        return word

    def apply_bionic_reading(self, text):
        """
        Intervention 2: Bionic Reading (Fixation Points)
        Boldifies the first 40-50% of every word to guide the eye's saccadic jumps smoothly.
        Transforms: 'model' -> '<b>mo</b>del'
        """
        words = text.split()
        bionic_words = []
        
        for word in words:
            # Clean punctuation mapping
            clean_word = re.sub(r'[^\w]', '', word)
            if not clean_word:
                bionic_words.append(word)
                continue
                
            mid = max(1, len(clean_word) // 2)
            if len(clean_word) <= 3:
                mid = 1 # Bold just the first letter for tiny words
                
            bold_part = word[:mid]
            rest_part = word[mid:]
            
            bionic_words.append(f"<b>{bold_part}</b>{rest_part}")
            
        return " ".join(bionic_words)

    def trigger_audio_cue(self, word):
        """
        Intervention 3: Text-to-Speech Payload Generation
        Prepares instructions for the frontend to play a clear phonetic utterance.
        """
        return {
            "action": "PLAY_AUDIO",
            "text_to_speak": word,
            "rate": 0.75 # Slower speech rate for struggling learners
        }
# Add this to the very bottom of intervention.py to verify its logic!
if __name__ == "__main__":
    print("---Testing ZyraLex Intervention Engine --- \n")
    engine = InterventionEngine()
    
    # 1. Test Syllable Splitter (Hyphen Style)
    test_word_1 = "dyslexia"
    print(f"Original: {test_word_1}")
    print(f"Syllable (Hyphen): {engine.format_syllable_breakdown(test_word_1, style='hyphen')}\n")
    
    # 2. Test Syllable Splitter (Color HTML Style)
    test_word_2 = "intervention"
    print(f"Original: {test_word_2}")
    print(f"Syllable (HTML Color): {engine.format_syllable_breakdown(test_word_2, style='color')}\n")
    
    # 3. Test Bionic Reading Engine
    sample_sentence = "The student is fixating on a single word for too long."
    print(f"Original Sentence: {sample_sentence}")
    print(f"Bionic Version:    {engine.apply_bionic_reading(sample_sentence)}\n")
    
    # 4. Test Audio Cue Generator
    print("Audio Payload Generation:")
    print(engine.trigger_audio_cue("fixation"))