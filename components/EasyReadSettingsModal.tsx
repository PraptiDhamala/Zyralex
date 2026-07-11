// components/EasyReadSettingsModal.tsx
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface ThemeColors {
  bg: string;
  text: string;
}

export const THEMES: Record<string, ThemeColors> = {
  white: { bg: '#FFFFFF', text: '#111111' },
  cream: { bg: '#FFFDD0', text: '#2B2B2A' },
  yellow: { bg: '#FAFAC8', text: '#222222' },
  blue: { bg: '#E6F2FF', text: '#1A2530' },
  dark: { bg: '#1E1E1E', text: '#E0E0E0' },
};

interface SettingsProps {
  visible: boolean;
  onClose: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  lineSpacing: number;
  setLineSpacing: (spacing: number) => void;
  letterSpacing: number;
  setLetterSpacing: (spacing: number) => void;
  currentTheme: keyof typeof THEMES;
  setTheme: (theme: keyof typeof THEMES) => void;
  fontFamily: string;
  setFontFamily: (family: string) => void;
  // Audio Speed Controls
  speechRate: number;
  setSpeechRate: (rate: number) => void;
}

export const EasyReadSettingsModal: React.FC<SettingsProps> = ({
  visible, onClose, fontSize, setFontSize, lineSpacing, setLineSpacing, letterSpacing, setLetterSpacing, currentTheme, setTheme, fontFamily, setFontFamily,
  speechRate, setSpeechRate
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Visual Adjustments</Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Font Adjuster - Decreases safely down to 11px */}
            <Text style={styles.label}>Text Size ({fontSize}px)</Text>
            <View style={styles.row}>
              <TouchableOpacity style={styles.btn} onPress={() => setFontSize(Math.max(11, fontSize - 1))}><Text style={styles.btnTxt}>A-</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn} onPress={() => setFontSize(Math.min(32, fontSize + 1))}><Text style={styles.btnTxt}>A+</Text></TouchableOpacity>
            </View>

            {/* Font Family Selection */}
            <Text style={styles.label}>Typography Style</Text>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, fontFamily === 'Times New Roman' && styles.active]} onPress={() => setFontFamily('Times New Roman')}>
                <Text style={[styles.btnTxt, fontFamily === 'Times New Roman' && styles.activeTxt, { fontFamily: 'Times New Roman' }]}>Times New Roman</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, fontFamily === 'System' && styles.active]} onPress={() => setFontFamily('System')}>
                <Text style={[styles.btnTxt, fontFamily === 'System' && styles.activeTxt]}>Modern Sans</Text>
              </TouchableOpacity>
            </View>

            {/* Line Spacing */}
            <Text style={styles.label}>Line Spacing</Text>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, lineSpacing === 1.2 && styles.active]} onPress={() => setLineSpacing(1.2)}><Text style={[styles.btnTxt, lineSpacing === 1.2 && styles.activeTxt]}>Compact</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btn, lineSpacing === 1.5 && styles.active]} onPress={() => setLineSpacing(1.5)}><Text style={[styles.btnTxt, lineSpacing === 1.5 && styles.activeTxt]}>Standard</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btn, lineSpacing === 2 && styles.active]} onPress={() => setLineSpacing(2)}><Text style={[styles.btnTxt, lineSpacing === 2 && styles.activeTxt]}>Relaxed</Text></TouchableOpacity>
            </View>

            {/* Letter Spacing */}
            <Text style={styles.label}>Letter Spacing</Text>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, letterSpacing === 0 && styles.active]} onPress={() => setLetterSpacing(0)}><Text style={[styles.btnTxt, letterSpacing === 0 && styles.activeTxt]}>Tight</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btn, letterSpacing === 0.5 && styles.active]} onPress={() => setLetterSpacing(0.5)}><Text style={[styles.btnTxt, letterSpacing === 0.5 && styles.activeTxt]}>Normal</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.btn, letterSpacing === 1.5 && styles.active]} onPress={() => setLetterSpacing(1.5)}><Text style={[styles.btnTxt, letterSpacing === 1.5 && styles.activeTxt]}>Wide</Text></TouchableOpacity>
            </View>

            {/* Speech Speed Control */}
            <Text style={styles.label}>Speech Speed</Text>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.btn, speechRate === 0.5 && styles.active]} onPress={() => setSpeechRate(0.5)}>
                <Text style={[styles.btnTxt, speechRate === 0.5 && styles.activeTxt]}>0.5x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, speechRate === 1.0 && styles.active]} onPress={() => setSpeechRate(1.0)}>
                <Text style={[styles.btnTxt, speechRate === 1.0 && styles.activeTxt]}>1.0x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, speechRate === 1.5 && styles.active]} onPress={() => setSpeechRate(1.5)}>
                <Text style={[styles.btnTxt, speechRate === 1.5 && styles.activeTxt]}>1.5x</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, speechRate === 2.0 && styles.active]} onPress={() => setSpeechRate(2.0)}>
                <Text style={[styles.btnTxt, speechRate === 2.0 && styles.activeTxt]}>2.0x</Text>
              </TouchableOpacity>
            </View>

            {/* Theme Settings */}
            <Text style={styles.label}>Background Contrast Tint</Text>
            <View style={styles.themeRow}>
              {Object.keys(THEMES).map((key) => (
                <TouchableOpacity 
                  key={key} 
                  style={[styles.themeChip, { backgroundColor: THEMES[key].bg }, currentTheme === key && styles.themeActive]}
                  onPress={() => setTheme(key as keyof typeof THEMES)}
                />
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnTxt}>Apply Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { backgroundColor: '#FFF', borderRadius: 20, padding: 22, width: '90%', maxWidth: 460, maxHeight: '85%' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#111' },
  label: { fontSize: 14, fontWeight: '600', marginTop: 14, marginBottom: 8, color: '#444' },
  row: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  themeRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap', marginTop: 5 },
  btn: { flex: 1, backgroundColor: '#F2F2F7', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  active: { backgroundColor: '#007AFF' },
  btnTxt: { fontWeight: '600', color: '#333', fontSize: 13 },
  activeTxt: { color: '#FFF' },
  themeChip: { width: 45, height: 45, borderRadius: 22.5, borderWidth: 1, borderColor: '#DDD' },
  themeActive: { borderWidth: 3, borderColor: '#007AFF' },
  closeBtn: { backgroundColor: '#007AFF', padding: 15, borderRadius: 12, marginTop: 25, alignItems: 'center' },
  closeBtnTxt: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});