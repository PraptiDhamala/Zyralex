// screens/EasyReadScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import * as Speech from 'expo-speech';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { EasyReadSettingsModal, THEMES } from '../components/EasyReadSettingsModal';
import { EasyReadToolbar } from '../components/EasyReadToolbar';
import { ParsedPage, parsePdfDocument } from '../services/pdfParserService';

// STUB REUSE EXAMPLES: Import mock hooks representing your pre-existing systems
const useGazeDetectionMock = () => ({ isUserLookingAway: false }); 

export const EasyReadScreen = () => {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState<ParsedPage[]>([]);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  
  // Custom Typography & Layout State
  const [fontSize, setFontSize] = useState(20);
  const [lineSpacing, setLineSpacing] = useState(2);
  const [letterSpacing, setLetterSpacing] = useState(2);
  const [themeKey, setThemeKey] = useState<keyof typeof THEMES>('cream');
  const [fontFamily, setFontFamily] = useState('System');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Speech Rate State (0.5x, 1.0x, 1.5x, 2.0x)
  const [speechRate, setSpeechRate] = useState<number>(1.0);

  const theme = THEMES[themeKey];
  const fileIdRef = useRef<string>("");

  // Existing module integration hooks tracking
  const { isUserLookingAway } = useGazeDetectionMock();

  // Watch gaze changes: Automatically handle pauses when user shifts gaze
  useEffect(() => {
    if (isUserLookingAway && isPlaying) {
      handlePause();
    }
  }, [isUserLookingAway]);

  // Load persistence positions when file identifier modifications occur
  useEffect(() => {
    if (pages.length > 0) {
      loadReadingProgress();
    }
  }, [pages]);

  const selectDocument = async () => {
    const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: true });
    if (res.canceled) return;
    
    setLoading(true);
    try {
      fileIdRef.current = res.assets[0].name;
      const parsedData = await parsePdfDocument(res.assets[0].uri);
      setPages(parsedData);
      setCurrentPageIdx(0);
      setCurrentSentenceIdx(null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveReadingProgress = async (pageIdx: number) => {
    if (!fileIdRef.current) return;
    await AsyncStorage.setItem(`@easy_read_progress_${fileIdRef.current}`, String(pageIdx));
  };

  const loadReadingProgress = async () => {
    const saved = await AsyncStorage.getItem(`@easy_read_progress_${fileIdRef.current}`);
    if (saved !== null) {
      setCurrentPageIdx(Number(saved));
    }
  };

  // Text to Speech Management Loop
  const speakCurrentSentence = (index: number) => {
    const activePage = pages[currentPageIdx];
    if (!activePage || index >= activePage.sentences.length) {
      handleNextPage(); // Fall forward automatically to next page
      return;
    }

    setCurrentSentenceIdx(index);
    setIsPlaying(true);

    Speech.speak(activePage.sentences[index], {
      rate: speechRate, // Applies the selected user playback speed multiplier
      onDone: () => speakCurrentSentence(index + 1),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      speakCurrentSentence(currentSentenceIdx ?? 0);
    }
  };

  const handlePause = () => {
    Speech.stop();
    setIsPlaying(false);
  };

  const handleStop = () => {
    Speech.stop();
    setIsPlaying(false);
    setCurrentSentenceIdx(null);
  };

  const handleNextPage = () => {
    if (currentPageIdx < pages.length - 1) {
      handleStop();
      const nextIdx = currentPageIdx + 1;
      setCurrentPageIdx(nextIdx);
      saveReadingProgress(nextIdx);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      handleStop();
      const prevIdx = currentPageIdx - 1;
      setCurrentPageIdx(prevIdx);
      saveReadingProgress(prevIdx);
    }
  };

  const progressPercentage = pages.length > 0 ? Math.round(((currentPageIdx + 1) / pages.length) * 100) : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Top Section Panel header tracking details */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Easy Read Engine</Text>
        {pages.length > 0 && (
          <Text style={[styles.progressIndicator, { color: theme.text }]}>
            Page {currentPageIdx + 1} of {pages.length} ({progressPercentage}%)
          </Text>
        )}
      </View>

      {/* Main Core View Area containing active string structures */}
      <View style={styles.contentArea}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : pages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <TouchableOpacity style={styles.uploadBtn} onPress={selectDocument}>
              <Text style={styles.uploadBtnText}>📂 Open & Convert PDF File</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.textContainer}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {pages[currentPageIdx]?.sentences.map((sentence, idx) => {
                const isCurrent = idx === currentSentenceIdx;
                return (
                  <Text
                    key={idx}
                    style={{
                      fontSize: fontSize,
                      lineHeight: fontSize * lineSpacing,
                      letterSpacing: letterSpacing,
                      fontFamily: fontFamily === 'System' ? undefined : fontFamily,
                      color: theme.text,
                      backgroundColor: isCurrent ? '#FFFF00' : 'transparent',
                      fontWeight: isCurrent ? 'bold' : 'normal',
                      marginBottom: 8,
                    }}
                  >
                    {sentence}{' '}
                  </Text>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Interface Interactive Bottom Footer Section panel triggers */}
      {pages.length > 0 && (
        <EasyReadToolbar
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onStop={handleStop}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onOpenSettings={() => setSettingsOpen(true)}
          canPrev={currentPageIdx > 0}
          canNext={currentPageIdx < pages.length - 1}
        />
      )}

      {/* Settings Panel Adjustments Overlay */}
      <EasyReadSettingsModal
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        lineSpacing={lineSpacing}
        setLineSpacing={setLineSpacing}
        letterSpacing={letterSpacing}
        setLetterSpacing={setLetterSpacing}
        currentTheme={themeKey}
        setTheme={setThemeKey}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        speechRate={speechRate}
        setSpeechRate={setSpeechRate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  progressIndicator: { fontSize: 14, fontWeight: '600' },
  contentArea: { flex: 1, justifyContent: 'center', paddingHorizontal: 15 },
  emptyContainer: { alignItems: 'center' },
  uploadBtn: { backgroundColor: '#007AFF', paddingHorizontal: 25, paddingVertical: 15, borderRadius: 12 },
  uploadBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  textContainer: { paddingVertical: 20 }
});