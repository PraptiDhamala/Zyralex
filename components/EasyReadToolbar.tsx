// components/EasyReadToolbar.tsx
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ToolbarProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStop: () => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onOpenSettings: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export const EasyReadToolbar: React.FC<ToolbarProps> = ({
  isPlaying, onPlayPause, onStop, onPrevPage, onNextPage, onOpenSettings, canPrev, canNext
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.navRow}>
        <TouchableOpacity style={[styles.navBtn, !canPrev && styles.disabled]} disabled={!canPrev} onPress={onPrevPage}>
          <Text style={styles.btnText}>⬅️ Prev</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.ttsMainBtn} onPress={onPlayPause}>
          <Text style={styles.ttsMainText}>{isPlaying ? "⏸️ Pause" : "▶️ Read Aloud"}</Text>
        </TouchableOpacity>

        {isPlaying && (
          <TouchableOpacity style={styles.stopBtn} onPress={onStop}>
            <Text style={styles.btnText}>⏹️</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={[styles.navBtn, !canNext && styles.disabled]} disabled={!canNext} onPress={onNextPage}>
          <Text style={styles.btnText}>Next ➡️</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.settingsRowBtn} onPress={onOpenSettings}>
        <Text style={styles.settingsText}>⚙️ Adjust Text Font & Contrast Layout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderTopWidth: 1, borderTopColor: '#EAEAEA', backgroundColor: '#FFF', padding: 15, paddingBottom: 30 },
  navRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  navBtn: { padding: 10, backgroundColor: '#F2F2F7', borderRadius: 8 },
  disabled: { opacity: 0.4 },
  ttsMainBtn: { flex: 1, backgroundColor: '#007AFF', paddingVertical: 12, marginHorizontal: 10, borderRadius: 25, alignItems: 'center' },
  ttsMainText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  stopBtn: { padding: 12, backgroundColor: '#FF3B30', borderRadius: 25, marginRight: 10 },
  btnText: { fontWeight: '600', fontSize: 14 },
  settingsRowBtn: { alignItems: 'center', paddingVertical: 5 },
  settingsText: { color: '#007AFF', fontWeight: '500' }
});