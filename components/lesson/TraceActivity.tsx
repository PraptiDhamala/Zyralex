import { useRef, useState } from "react";
import {
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Svg, { Path } from "react-native-svg";

export default function TraceActivity({ letter }: { letter: string }) {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [strokeCount, setStrokeCount] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        setPoints([{ x: locationX, y: locationY }]);
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        setPoints((p) => [...p, { x: locationX, y: locationY }]);
      },
      onPanResponderRelease: () => {
        setStrokeCount((c) => c + 1);
      },
    }),
  ).current;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const clear = () => {
    setPoints([]);
    setStrokeCount(0);
  };

  return (
    <View>
      <Text style={styles.hint}>
        Trace the letter "{letter}" below with your finger ✍️
      </Text>
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Text style={styles.ghostLetter}>{letter}</Text>
        <Svg style={StyleSheet.absoluteFill} height="100%" width="100%">
          <Path
            d={d}
            stroke="#2563EB"
            strokeWidth={8}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      <View style={styles.row}>
        <Text style={styles.strokeText}>Strokes: {strokeCount}</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clear}>
          <Text style={styles.clearText}>Clear & Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },
  canvas: {
    height: 220,
    borderRadius: 20,
    backgroundColor: "#F8FAFC",
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 12,
  },
  ghostLetter: {
    fontSize: 140,
    fontWeight: "800",
    color: "#E2E8F0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  strokeText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "600",
  },
  clearButton: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  clearText: {
    color: "#64748B",
    fontWeight: "700",
    fontSize: 13,
  },
});
