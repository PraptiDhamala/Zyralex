import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

type ExplanationItem = {
  type: string;
  content: string;
  animationType?: string;
  visualAnchor?: string;
};

export default function ExplanationVisual({ item }: { item: ExplanationItem }) {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  useEffect(() => {
    rotate.value = 0;
    scale.value = 1;
    translateX.value = 0;

    if (item.animationType === "mirror-flip") {
      rotate.value = withTiming(180, { duration: 900 });
    }
    if (item.animationType === "pulse-on-audio") {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.15, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
        3,
        false,
      );
    }
    if (item.animationType === "stroke-by-stroke") {
      translateX.value = withSequence(
        withTiming(-8, { duration: 200 }),
        withTiming(8, { duration: 200 }),
        withTiming(0, { duration: 200 }),
      );
    }
  }, [item]);

  const flipStyle = useAnimatedStyle(() => ({
    transform: [{ rotateY: `${rotate.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (!item.visualAnchor) return null;

  if (item.animationType === "mirror-flip") {
    return (
      <View style={styles.wrap}>
        <Animated.Text style={[styles.bigLetter, flipStyle]}>
          {item.visualAnchor}
        </Animated.Text>
      </View>
    );
  }

  if (item.animationType === "pulse-on-audio") {
    return (
      <View style={styles.wrap}>
        <Animated.Text style={[styles.bigLetter, pulseStyle]}>
          {item.visualAnchor}
        </Animated.Text>
      </View>
    );
  }

  if (item.animationType === "stroke-by-stroke") {
    return (
      <View style={styles.wrap}>
        <Animated.Text style={[styles.bigLetter, shakeStyle]}>
          {item.visualAnchor}
        </Animated.Text>
      </View>
    );
  }

  if (item.animationType === "morph-asset") {
    return (
      <View style={styles.wrap}>
        <Text style={styles.bigLetter}>{item.visualAnchor}</Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    minHeight: 90,
  },
  bigLetter: {
    fontSize: 72,
    fontWeight: "800",
    color: "#2563EB",
  },
});
