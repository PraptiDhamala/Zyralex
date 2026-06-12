import { ResizeMode, Video } from 'expo-av';
import { Camera, CameraView } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LESSON_MAP } from '../../constants/lessonData';

export default function CameraPracticeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);

  const { levelId, lessonId } = useLocalSearchParams<{ levelId: string; lessonId: string }>();
  const lessonKey = `${levelId}_${lessonId}`;
  const lesson = LESSON_MAP[lessonKey];
  const router = useRouter();

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

  const handleExit = () => {
    Alert.alert(
      "Exit Practice",
      "Do you want to leave the practice session?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Yes, Exit", style: "destructive", onPress: () => router.push("/sign/practicegrid") }
      ]
    );
  };

  const handleNext = () => {
    if (index < lesson.signs.length - 1) {
      setIndex(index + 1);
    } else {
      Alert.alert(
        "Lesson Complete",
        "🎉 You’ve finished all signs in this lesson!",
        [
          { text: "Practice again", style: "cancel", onPress: () => setIndex(0) },
          { text: "Exit", style: "destructive", onPress: () => router.push("/sign/practicegrid") }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front" />

      {/* Exit button */}
      <TouchableOpacity style={styles.exitBtn} onPress={handleExit} accessibilityLabel="Exit practice">
        <Text style={styles.exitText}>✕</Text>
      </TouchableOpacity>

      {/* Top-right overlay for sign video + caption */}
      <View style={styles.topOverlay}>
        <Video
          source={{ uri: currentSign.video }}
          style={styles.signVideo}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
        <Text style={styles.caption}>{currentSign.label}</Text>
      </View>

      
      <View style={styles.bottomOverlay}>
        <Text style={styles.hint}>{currentSign.hint}</Text>
        <Text style={styles.progressText}>
          Sign {index + 1} of {lesson.signs.length}
        </Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => setIndex(Math.max(0, index - 1))}
            accessibilityLabel="Previous sign"
          >
            <Text style={styles.btn}>← Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={handleNext}
            accessibilityLabel="Next sign"
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

  exitBtn: {
    position: 'absolute',
    top: 5,
    left: 10,
    borderRadius: 20,
    padding: 8,
  },
  exitText: { fontSize: 18, fontWeight: '700', color: '#0d0d0d' },

  topOverlay: {
    position: 'absolute',
    top: 1,
    right: 10,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 30,
  },
  signVideo: {
    width: 200,
    height: 200,
    marginBottom: 4,
    borderRadius: 30,
    overflow: 'hidden',
  },
  caption: { fontSize: 28, fontWeight: '900', color: '#333' },

  bottomOverlay: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  hint: {
    fontSize: 16,
    color: '#070707',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  progressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },

  controls: { flexDirection: 'row', gap: 150 },
  btnContainer: {
    backgroundColor: '#d2f9d9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btn: { fontSize: 14, fontWeight: '600', color: '#090808' },
});