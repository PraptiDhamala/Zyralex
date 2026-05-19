import { Camera, CameraView } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LESSON_MAP } from '../../constants/lessonData';

export default function CameraPracticeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);

  const { levelId, lessonId } = useLocalSearchParams<{ levelId: string; lessonId: string }>();
  const lessonKey = `${levelId}_${lessonId}`;
  const lesson = LESSON_MAP[lessonKey];

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;
  if (!lesson) return <Text>Lesson not found</Text>;

  const currentSign = lesson.signs[index];

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front" />

      {/* Top-right overlay for sign image */}
      <View style={styles.topOverlay}>
        <Image source={currentSign.image} style={styles.signImage} />
        <Text style={styles.caption}>{currentSign.label}</Text>
      </View>

      {/* Bottom overlay for hint + controls */}
      <View style={styles.bottomOverlay}>
        <Text style={styles.hint}>{currentSign.hint}</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => setIndex(Math.max(0, index - 1))}
          >
            <Text style={styles.btn}>← Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => setIndex(Math.min(lesson.signs.length - 1, index + 1))}
          >
            <Text style={styles.btn}>Next →</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  camera: { flex: 1 },

  topOverlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
  },
  signImage: { width: 100, height: 100, resizeMode: 'contain', marginBottom: 4 },
  caption: { fontSize: 14, fontWeight: '600', color: '#333' },

  bottomOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  hint: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 12 },

  controls: { flexDirection: 'row', gap: 20 },
  btnContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btn: { fontSize: 14, fontWeight: '600', color: '#fff' },
});
