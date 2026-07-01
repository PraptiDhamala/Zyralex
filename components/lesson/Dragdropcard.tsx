import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

type Practice = {
  question: string;
  options: string[];
  answer: string;
};

function DraggableTile({
  label,
  dropZoneRef,
  disabled,
  onDrop,
}: {
  label: string;
  dropZoneRef: React.RefObject<View | null>;
  disabled: boolean;
  onDrop: (label: string) => void;
}) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const checkDrop = (absX: number, absY: number) => {
    if (!dropZoneRef.current) return;

    // Use measureInWindow to get reliable window-relative positions matching absX and absY
    dropZoneRef.current.measureInWindow((x, y, width, height) => {
      const inside =
        absX >= x && absX <= x + width && absY >= y && absY <= y + height;

      if (inside) {
        runOnJS(onDrop)(label);
      } else {
        // Reset position if dropped outside
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });
  };

  const pan = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    })
    .onEnd((e) => {
      runOnJS(checkDrop)(e.absoluteX, e.absoluteY);
    });

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    zIndex: disabled ? 1 : 999, // Keep dragged item on top of other elements
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.tile, style, disabled && styles.tileDisabled]}
      >
        <Text style={styles.tileText}>{label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export default function DragDropCard({
  practice,
  onAnswer,
}: {
  practice: Practice;
  onAnswer: (selected: string, correct: string) => void;
}) {
  const dropZoneRef = useRef<View>(null);
  const [dropped, setDropped] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const handleDrop = (label: string) => {
    if (locked) return;
    setDropped(label);
    setLocked(true);
    onAnswer(label, practice.answer);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.question}>{practice.question}</Text>
      <Text style={styles.subhint}>
        Drag the correct card into the box below
      </Text>

      <View ref={dropZoneRef} style={styles.dropZone}>
        <Text style={styles.dropZoneText}>
          {dropped ? dropped : "Drop here"}
        </Text>
      </View>

      <View style={styles.tileRow}>
        {practice.options.map((option, index) => (
          <DraggableTile
            key={index}
            label={option}
            dropZoneRef={dropZoneRef}
            disabled={locked}
            onDrop={handleDrop}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    width: "100%",
  },
  question: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1E293B",
    lineHeight: 34,
    textAlign: "center",
  },
  subhint: {
    fontSize: 13,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 20,
  },
  dropZone: {
    height: 90,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: "#93C5FD",
    borderStyle: "dashed",
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },
  dropZoneText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
  },
  tileRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  tile: {
    width: 100,
    height: 100,
    backgroundColor: "#F1F5F9",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#CBD5E1",
  },
  tileDisabled: {
    opacity: 0.5,
  },
  tileText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#334155",
  },
});
