import { ResizeMode, Video } from 'expo-av';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LESSON_MAP } from '../../constants/lessonData';

export default function CameraPracticeScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const [running, setRunning] = useState(false);

  const cameraRef = useRef<any>(null);
  const runningRef = useRef(false);
  const lastCallRef = useRef(0);

  const { levelId, lessonId } = useLocalSearchParams<any>();
  const lessonKey = `${levelId}_${lessonId}`;
  const lesson = LESSON_MAP[lessonKey];
  const router = useRouter();

  const currentSign = lesson?.signs[index];

  // -------------------------
  // PERMISSION
  // -------------------------
  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission?.granted) {
    return (
      <Text style={{ marginTop: 100, textAlign: "center", color: "#fff" }}>
        Requesting camera permission...
      </Text>
    );
  }

  if (!lesson) {
    return <Text>Lesson not found</Text>;
  }

  // -------------------------
  // START LOOP
  // -------------------------
  const start = () => {
    runningRef.current = true;
    setRunning(true);
    loop();
  };

  const stop = () => {
    runningRef.current = false;
    setRunning(false);
  };

  // -------------------------
  // REAL-TIME LOOP (NO SHUTTER FEEL)
  // -------------------------
  const loop = async () => {
    if (!runningRef.current) return;

    const now = Date.now();

    // throttle (IMPORTANT)
    if (now - lastCallRef.current < 500) {
      setTimeout(loop, 100);
      return;
    }

    lastCallRef.current = now;

    try {
      if (!cameraRef.current) {
        setTimeout(loop, 200);
        return;
      }

      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.3,
        skipProcessing: true,
      });

      if (photo?.base64) {
        await sendFrame(photo.base64);
      }

    } catch (e) {
      console.log("Capture error:", e);
    }

    setTimeout(loop, 100);
  };

  // -------------------------
  // BACKEND CALL
  // -------------------------
  const sendFrame = async (base64Image: string) => {
    try {
      const res = await fetch("http://192.168.1.7:8000/realtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          target_sign: currentSign?.label,
        }),
      });

      const data = await res.json();

      setScore(data.score ?? 0);
      setFeedback(data.feedback ?? "");

    } catch (err) {
      console.log("Backend error:", err);
    }
  };

  // -------------------------
  // NAVIGATION
  // -------------------------
  const next = () => {
    stop();
    setScore(0);
    setFeedback("");

    if (index < lesson.signs.length - 1) {
      setIndex(index + 1);
    } else {
      router.push("/sign/practicegrid");
    }
  };

  const prev = () => {
    stop();
    setIndex(Math.max(0, index - 1));
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <View style={styles.container}>

      {/* CAMERA */}
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="front"
      />

      {/* TOP SIGN */}
      <View style={styles.top}>
        <Video
          source={{ uri: currentSign.video }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
        <Text style={styles.title}>{currentSign.label}</Text>
      </View>

      {/* BOTTOM UI */}
      <View style={styles.bottom}>

        <Text style={styles.score}>
          {score.toFixed(2)}
        </Text>

        <Text style={[
          styles.feedback,
          { color: feedback.includes("Correct") ? "#4ade80" : "#f87171" }
        ]}>
          {feedback}
        </Text>

        <Text style={styles.progress}>
          {index + 1} / {lesson.signs.length}
        </Text>

        <View style={styles.row}>
          <TouchableOpacity onPress={prev} style={styles.btn}>
            <Text style={styles.btnText}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={next} style={styles.btn}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={running ? stop : start}
          style={[
            styles.mainBtn,
            running && { backgroundColor: "#ef4444" }
          ]}
        >
          <Text style={styles.mainBtnText}>
            {running ? "Stop Practice" : "Start Practice"}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

// -------------------------
// STYLES
// -------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  top: {
    position: "absolute",
    top: 50,
    right: 20,
    alignItems: "center",
  },

  video: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },

  title: {
    color: "#fff",
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
  },

  bottom: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },

  score: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "700",
  },

  feedback: {
    fontSize: 16,
    marginTop: 5,
  },

  progress: {
    color: "#aaa",
    marginTop: 5,
  },

  row: {
    flexDirection: "row",
    gap: 20,
    marginTop: 15,
  },

  btn: {
    backgroundColor: "#1f2937",
    padding: 10,
    borderRadius: 10,
    width: 80,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
  },

  mainBtn: {
    marginTop: 15,
    backgroundColor: "#22c55e",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },

  mainBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});