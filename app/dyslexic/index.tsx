import {
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { useFocusEffect, useRouter } from "expo-router";
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { EasyReadSettingsModal, THEMES } from "../../components/EasyReadSettingsModal";
import { HelloWave } from "../../components/hello-wave";
import { COLORS } from "../../constants/colors";
import { supabase } from "../../lib/supabase";
import { ParsedPage, parsePdfDocument } from '../../services/pdfParserService';

export default function DyslexicHome() {
  const router = useRouter();

  // DASHBOARD MANAGEMENT STATES
  const [isSimplified, setIsSimplified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dbLoading, setDbLoading] = useState(true);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<string>("Beginner");
  const [weakArea, setWeakArea] = useState<string>("None");
  const [reviewMessage, setReviewMessage] = useState<string>("Take your assessment to begin.");
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [completedLessonsCount, setCompletedLessonsCount] = useState<number>(0);

  // INTEGRATED OPTIMIZED STABLE BASELINE PRESETS FROM HALF CODE
  const [pages, setPages] = useState<ParsedPage[]>([]);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [currentPageIdx, setCurrentPageIdx] = useState(0);
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(14); 
  const [lineSpacing, setLineSpacing] = useState(1.5); 
  const [letterSpacing, setLetterSpacing] = useState(0.5); 
  const [fontFamily, setFontFamily] = useState('Times New Roman'); 
  const [themeKey, setThemeKey] = useState<keyof typeof THEMES>('white');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSyllableMode, setIsSyllableMode] = useState<boolean>(false);

  const theme = THEMES[themeKey];
  const fileIdRef = useRef<string>("");

  // TRACK EASY-READ LOCAL STORAGE PROGRESS
  useEffect(() => {
    if (typeof window !== 'undefined' && pages.length > 0 && fileIdRef.current) {
      localStorage.setItem(`@easy_read_progress_${fileIdRef.current}`, String(currentPageIdx));
    }
  }, [currentPageIdx, pages]);

  // FETCH METRICS ON MOUNT
  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, []),
  );

  const fetchUserData = async () => {
    try {
      setDbLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: assessmentData, error: assessmentError } = await supabase
        .from("assessments")
        .select("score, level, weak_area, review")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1);

      if (assessmentError) throw assessmentError;

      if (assessmentData && assessmentData.length > 0) {
        const latest = assessmentData[0];
        setScore(latest.score ?? 0);
        setLevel(latest.level || "Beginner");
        setWeakArea(latest.weak_area || "None");
        setReviewMessage(latest.review || "Take your assessment to begin.");
      } else {
        setScore(0);
        setLevel("Beginner");
        setWeakArea("None");
        setReviewMessage("Take your assessment to begin.");
      }

      const { data: progressData } = await supabase
        .from("user_progress")
        .select("completed")
        .eq("user_id", user.id);

      if (progressData) {
        const totalLessons = 4;
        const completed = progressData.filter((p) => p.completed).length;
        setCompletedLessonsCount(completed);
        setProgressPercent(
          Math.min(100, Math.floor((completed / totalLessons) * 100)),
        );
      }
    } catch (err) {
      console.error("Error reading dashboard statistics: ", err);
    } finally {
      setDbLoading(false);
    }
  };

  // DOCUMENT PICKER & INTERACTIVE PARSER
  const pickDocument = async () => {
    try {
      setLoading(true);
      const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      
      if (res.canceled || !res.assets || res.assets.length === 0) {
        setLoading(false);
        return;
      }
      
      const file = res.assets[0];
fileIdRef.current = file.name;

// ⚡ FIX: Fall back directly to file.uri so fetch can read it as a valid string pathway
const nativeBrowserBlob = file.file || (file as any).output?.[0] || file.uri || file; 
const parsedData = await parsePdfDocument(nativeBrowserBlob);
      setPages(parsedData);
      setCurrentPageIdx(0);
      setCurrentSentenceIdx(null);
    } catch (e) {
      console.error("Selection failure: ", e);
      alert("Error parsing document assets locally.");
    } finally {
      setLoading(false);
    }
  };


  // TTS LOGIC
  const speakCurrentSentence = (index: number) => {
    const activePage = pages[currentPageIdx];
    if (!activePage || index >= activePage.sentences.length) {
      handleStop();
      return;
    }

    setCurrentSentenceIdx(index);
    setIsPlaying(true);

    Speech.speak(activePage.sentences[index], {
      rate: speechRate,
      onDone: () => speakCurrentSentence(index + 1),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      Speech.stop();
      setIsPlaying(false);
    } else {
      speakCurrentSentence(currentSentenceIdx ?? 0);
    }
  };

  const handleStop = () => {
    Speech.stop();
    setIsPlaying(false);
    setCurrentSentenceIdx(null);
  };

  const handleNextPage = () => {
    if (currentPageIdx < pages.length - 1) {
      handleStop();
      setCurrentPageIdx(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIdx > 0) {
      handleStop();
      setCurrentPageIdx(prev => prev - 1);
    }
  };

  const renderSyllableSentence = (sentenceText: string) => {
    if (!isSyllableMode || !activePageData?.syllableMap) return sentenceText;

    let processed = sentenceText;
    const sortedMap = [...activePageData.syllableMap].sort((a, b) => b.original.length - a.original.length);

    sortedMap.forEach(({ original, split }) => {
      const regex = new RegExp(`\\b${original}\\b`, 'gi');
      processed = processed.replace(regex, split);
    });

    return processed;
  };

  if (dbLoading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={{ marginTop: 12, color: "#6b7280", fontWeight: "600" }}>
          Syncing profile metrics...
        </Text>
      </View>
    );
  }

  const activePageData = pages[currentPageIdx];

  if (pages.length > 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => { handleStop(); setPages([]); }}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>Easy Read Reader</Text>
          <Text style={[styles.progressIndicator, { color: theme.text }]}>
            Page {currentPageIdx + 1} of {pages.length}
          </Text>
        </View>

        <View style={styles.contentArea}>
          <ScrollView contentContainerStyle={styles.textContainer}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {activePageData?.sentences.map((sentence, idx) => {
                const isCurrent = idx === currentSentenceIdx;
                return (
                  <TouchableOpacity 
                    key={idx} 
                    activeOpacity={0.9}
                    onPress={() => speakCurrentSentence(idx)}
                    style={{
                      backgroundColor: isCurrent ? 'rgba(255, 235, 59, 0.7)' : 'transparent',
                      borderRadius: 4,
                      padding: 2,
                      marginRight: 6,
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize,
                        lineHeight: fontSize * lineSpacing,
                        letterSpacing: letterSpacing,
                        fontFamily: fontFamily,
                        color: theme.text,
                        fontWeight: isCurrent ? 'bold' : 'normal',
                      }}
                    >
                      {renderSyllableSentence(sentence)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>

        <View style={styles.toolbarContainer}>
          <View style={styles.navRow}>
            <TouchableOpacity style={[styles.navBtn, currentPageIdx === 0 && styles.disabled]} disabled={currentPageIdx === 0} onPress={handlePrevPage}>
              <Text style={styles.btnText}>⬅️ Prev</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.splitterToggleBtn, 
                isSyllableMode ? styles.splitterActive : styles.splitterInactive
              ]} 
              onPress={() => setIsSyllableMode(!isSyllableMode)}
            >
              <Text style={[styles.splitterText, isSyllableMode ? { color: '#FFF' } : { color: '#7c3aed' }]}>
                {isSyllableMode ? "🟢 Split Active" : "⚪ Split Words"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ttsMainBtn} onPress={handlePlayPause}>
              <Text style={styles.ttsMainText}>{isPlaying ? "⏸️ Pause" : "▶️ Read Aloud"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.navBtn, currentPageIdx === pages.length - 1 && styles.disabled]} disabled={currentPageIdx === pages.length - 1} onPress={handleNextPage}>
              <Text style={styles.btnText}>Next ➡️</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.settingsRowBtn} onPress={() => setSettingsOpen(true)}>
            <Text style={styles.settingsText}>⚙️ Adjust Accessibility Settings</Text>
          </TouchableOpacity>
        </View>

        {/* REPLACED CUSTOM INLINE MODAL BLOCK WITH CLEAN SHARED EXTERNAL MODAL COMPONENT */}
        <EasyReadSettingsModal
  visible={settingsOpen}
  onClose={() => setSettingsOpen(false)}
  fontSize={fontSize}
  setFontSize={setFontSize}
  lineSpacing={lineSpacing}
  setLineSpacing={setLineSpacing}
  letterSpacing={letterSpacing}
  setLetterSpacing={setLetterSpacing}
  fontFamily={fontFamily}
  setFontFamily={setFontFamily}
   currentTheme={themeKey}       // Changed from themeKey={themeKey}
  setTheme={setThemeKey}
  speechRate={speechRate}     
  setSpeechRate={setSpeechRate}
        />
      </SafeAreaView>
    );
  }

  // DEFAULT BASE HOME SCREEN VIEW WITH ALL DASHBOARD FEATURE CARDS ATTACHED
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeSection}>
          <HelloWave />
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>Continue your learning journey</Text>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.levelHeader}>
            <View style={styles.iconCircleBlue}>
              <FontAwesome5 name="seedling" size={24} color="white" />
            </View>
            <View style={styles.levelTextContainer}>
              <Text style={styles.levelTitle}>{level.toUpperCase()}</Text>
              <Text style={styles.levelSubtitle}>
                {isSimplified ? "Current Program Track" : "Current Path Tracking"}
              </Text>
            </View>
            <View style={styles.xpContainer}>
              <Text style={styles.xpText}>{completedLessonsCount * 25} XP</Text>
              <Text style={styles.xpSubtext}>Lessons: {completedLessonsCount}/4</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <Text style={styles.progressPercent}>{progressPercent}% milestones completed</Text>

          <View style={styles.bubbleRow}>
            <View style={[styles.bubble, styles.activeBubble]}>
              <FontAwesome5 name="seedling" size={16} color="white" />
            </View>
            {[1, 2, 3, 4, 5].map((i) => (
              <View key={i} style={[styles.bubble, progressPercent >= i * 20 && styles.activeBubble]}>
                <Ionicons
                  name={progressPercent >= i * 20 ? "checkmark" : "lock-closed"}
                  size={16}
                  color={progressPercent >= i * 20 ? "white" : "#d1d5db"}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconTitle}>
              <MaterialCommunityIcons name="brain" size={20} color="#3b82f6" />
              <Text style={styles.aiTitle}> Diagnostic Strategy</Text>
            </View>
          </View>
          <Text style={styles.aiSubtitle}>Personalized for your reading patterns</Text>

          <View style={styles.simplificationRow}>
            <View style={styles.toggleLabelGroup}>
              <MaterialCommunityIcons name="auto-fix" size={18} color="#3b82f6" />
              <Text style={styles.toggleText}>Simplify display text adjustments</Text>
            </View>
            <Switch
              trackColor={{ false: "#d1d5db", true: "#93c5fd" }}
              thumbColor={isSimplified ? "#3b82f6" : "#f4f3f4"}
              onValueChange={() => setIsSimplified(!isSimplified)}
              value={isSimplified}
            />
          </View>

          <View style={styles.aiBubble}>
            <View style={styles.strategyRow}>
              <FontAwesome5 name="seedling" size={14} color="#22c55e" />
              <Text style={styles.strategyLabel}> Dynamic Plan: {reviewMessage}</Text>
            </View>
            <Text style={styles.aiMessage}>
              {isSimplified
                ? `System setup optimized for managing variations inside ${weakArea.replace("_", " ")} tracks.`
                : `Our algorithm detected performance concentrations relating to ${weakArea.replace("_", " ")}.`}
            </Text>
          </View>
        </View>

        <View style={styles.statsWrapper}>
          <View style={styles.statsGrid}>
            <View style={styles.newStatCard}>
              <Ionicons name="trending-up" size={24} color="#3b82f6" />
              <Text style={styles.newStatNumber}>{score}/10</Text>
              <Text style={styles.newStatLabel}>Latest Score</Text>
            </View>
            <View style={styles.newStatCard}>
              <Ionicons name="alert-circle" size={24} color="#3b82f6" />
              <Text style={{ fontSize: 10, fontWeight: "700", color: "#3b82f6", marginVertical: 6, textAlign: "center" }}>
                {weakArea.replace("_", "\n").toUpperCase()}
              </Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.newStatLabel}>Weak Area</Text>
            </View>
            <View style={styles.newStatCard}>
              <Ionicons name="rocket" size={24} color="#3b82f6" />
              <Text style={styles.newStatNumber}>{progressPercent}%</Text>
              <Text style={styles.newStatLabel}>Completion</Text>
            </View>
          </View>

          <View style={styles.actionButtonsSection}>
            <Pressable style={styles.actionButton} onPress={() => router.push("/dyslexic/learn")}>
              <View style={styles.actionButtonContent}>
                <Ionicons name="clipboard-outline" size={24} color="#3b82f6" />
                <Text style={styles.actionButtonLabel}>Take Assessment</Text>
              </View>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={pickDocument}>
              <View style={styles.actionButtonContent}>
                <Feather name="upload-cloud" size={24} color="#3b82f6" />
                <Text style={styles.actionButtonLabel}>Easy Read PDF</Text>
              </View>
            </Pressable>

            <Pressable style={styles.actionButton} onPress={() => { /* Handled separately */ }}>
              <View style={styles.actionButtonContent}>
                <Feather name="layers" size={24} color="#3b82f6" />
                <Text style={styles.actionButtonLabel}>Flashcard</Text>
              </View>
            </Pressable>
          </View>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>Extracting and mapping file structure...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f9ff" },
  scrollContent: { paddingBottom: 100, alignItems: "center" },
  welcomeSection: { alignItems: "center", paddingVertical: 24, paddingHorizontal: 16 },
  welcomeTitle: { fontSize: 22, fontWeight: "700", color: COLORS.darkGray, marginBottom: 4, textAlign: "center" },
  welcomeSubtitle: { fontSize: 14, color: COLORS.textLight, textAlign: "center" },
  mainCard: { backgroundColor: "white", width: "90%", marginTop: 20, padding: 20, borderRadius: 24, elevation: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  levelHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  iconCircleBlue: { width: 50, height: 50, backgroundColor: "#3b82f6", borderRadius: 12, justifyContent: "center", alignItems: "center" },
  levelTextContainer: { flex: 1, marginLeft: 15 },
  levelTitle: { fontSize: 18, fontWeight: "bold", color: "#1e293b" },
  levelSubtitle: { color: "#6b7280", fontSize: 13 },
  xpContainer: { alignItems: "flex-end" },
  xpText: { color: "#3b82f6", fontWeight: "bold", fontSize: 15 },
  xpSubtext: { fontSize: 10, color: "#9ca3af" },
  progressBarBg: { height: 8, backgroundColor: "#f3f4f6", borderRadius: 4, marginVertical: 10 },
  progressBarFill: { height: "100%", backgroundColor: "#3b82f6", borderRadius: 4 },
  progressPercent: { textAlign: "center", fontSize: 11, color: "#6b7280", fontWeight: "500" },
  bubbleRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 15 },
  bubble: { width: 35, height: 35, borderRadius: 18, backgroundColor: "#f3f4f6", justifyContent: "center", alignItems: "center" },
  activeBubble: { backgroundColor: "#3b82f6" },
  aiCard: { backgroundColor: "white", width: "90%", marginTop: 20, padding: 20, borderRadius: 24, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  aiHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  aiIconTitle: { flexDirection: "row", alignItems: "center" },
  aiTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 5, color: "#1e293b" },
  aiSubtitle: { fontSize: 12, color: "#9ca3af", marginBottom: 10, marginLeft: 5 },
  simplificationRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#eff6ff", padding: 10, borderRadius: 12, marginBottom: 10 },
  toggleLabelGroup: { flexDirection: "row", alignItems: "center" },
  toggleText: { fontSize: 13, fontWeight: "600", color: "#1e40af", marginLeft: 8 },
  aiBubble: { backgroundColor: "#f8fafc", padding: 15, borderRadius: 15, borderWidth: 1, borderColor: "#e2e8f0" },
  strategyRow: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  strategyLabel: { fontWeight: "bold", fontSize: 12, color: "#1e293b", marginLeft: 4 },
  aiMessage: { fontSize: 13, color: "#4b5563", lineHeight: 18 },
  statsWrapper: { width: "100%", marginTop: 25 },
  statsGrid: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, gap: 12 },
  newStatCard: { flex: 1, backgroundColor: "white", borderRadius: 16, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "#e5e7eb", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  newStatNumber: { fontSize: 16, fontWeight: "700", color: "#3b82f6", marginBottom: 4 },
  newStatLabel: { fontSize: 11, color: "#6b7280", fontWeight: "500", textAlign: "center" },
  actionButtonsSection: { flexDirection: "row", paddingHorizontal: 16, paddingVertical: 20, gap: 12 },
  actionButton: { flex: 1, backgroundColor: "white", borderRadius: 16, paddingVertical: 16, borderWidth: 1, borderColor: "#e5e7eb", elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  actionButtonContent: { alignItems: "center", justifyContent: "center", gap: 6 },
  actionButtonLabel: { fontSize: 13, fontWeight: "600", color: "#1f2937" },
  loadingContainer: { marginTop: 20, alignItems: "center" },
  loadingText: { marginTop: 10, color: "#3b82f6", fontWeight: "600" },

  // IN-APP READER CANVAS STYLES
  header: { padding: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backButton: { marginRight: 10, padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  progressIndicator: { fontSize: 13, fontWeight: '600' },
  contentArea: { flex: 1 },
  textContainer: { padding: 25 },
  toolbarContainer: { borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.08)', backgroundColor: '#FFF', padding: 15, paddingBottom: 25 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  navBtn: { padding: 12, backgroundColor: '#F2F2F7', borderRadius: 8 },
  disabled: { opacity: 0.3 },
  
  // INLINE SYLLABLE SWITCH TOGGLE BRAND STYLES
  splitterToggleBtn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 25, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  splitterActive: { backgroundColor: '#7c3aed', borderColor: '#6d28d9' },
  splitterInactive: { backgroundColor: '#FFF', borderColor: '#d1d5db' },
  splitterText: { fontWeight: 'bold', fontSize: 14 },

  ttsMainBtn: { flex: 1, backgroundColor: '#007AFF', paddingVertical: 12, marginHorizontal: 10, borderRadius: 25, alignItems: 'center' },
  ttsMainText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  btnText: { fontWeight: '600' },
  settingsRowBtn: { alignItems: 'center', paddingVertical: 4 },
  settingsText: { color: '#007AFF', fontWeight: '600', fontSize: 13 }
});