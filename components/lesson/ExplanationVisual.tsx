import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
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
  const translateY = useSharedValue(30);
  const opacity = useSharedValue(0);
  const wiggle = useSharedValue(0);

  useEffect(() => {

    rotate.value = 0;
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 30;
    opacity.value = 0;
    wiggle.value = 0;

    opacity.value = withTiming(1, { duration: 350 });
    translateY.value = withSpring(0, { damping: 12, stiffness: 120 });

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

    if (item.animationType === "bounce-in") {
      scale.value = 0.4;
      scale.value = withSpring(1, { damping: 6, stiffness: 160 });
    }

    if (item.animationType === "wiggle") {
      wiggle.value = withRepeat(
        withSequence(
          withTiming(6, { duration: 150, easing: Easing.inOut(Easing.ease) }),
          withTiming(-6, { duration: 150, easing: Easing.inOut(Easing.ease) }),
        ),
        4,
        true,
      );
    }

    if (item.animationType === "sparkle-burst") {
      scale.value = 0.7;
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 260 }),
          withTiming(0.95, { duration: 260 }),
        ),
        2,
        true,
      );
    }
  }, [item]);

  const flipStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { rotateY: `${rotate.value}deg` },
    ],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  const shakeStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
  }));

  const wiggleStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { rotate: `${wiggle.value}deg` },
    ],
  }));

  const popStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

    const defaultStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
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

  if (item.animationType === "wiggle") {
    return (
      <View style={styles.wrap}>
        <Animated.Text style={[styles.bigLetter, wiggleStyle]}>
          {item.visualAnchor}
        </Animated.Text>
      </View>
    );
  }

  if (
    item.animationType === "bounce-in" ||
    item.animationType === "sparkle-burst"
  ) {
    return (
      <View style={styles.wrap}>
        <Animated.Text style={[styles.bigLetter, popStyle]}>
          {item.visualAnchor}
        </Animated.Text>
        {item.animationType === "sparkle-burst" && (
          <Text style={styles.sparkleDeco}>✨</Text>
        )}
      </View>
    );
  }

  if (item.animationType === "morph-asset") {
    return (
      <View style={styles.wrap}>
        <Animated.Text style={[styles.bigLetter, popStyle]}>
          {item.visualAnchor}
        </Animated.Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Animated.Text style={[styles.bigLetter, defaultStyle]}>
        {item.visualAnchor}
      </Animated.Text>
    </View>
  );
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
  sparkleDeco: {
    fontSize: 22,
    marginTop: 4,
  },
});
