import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

export function HelloWave() {
  return (
    <LottieView
      source={require("../assets/WAVE.json")}
      style={styles.video}
      autoPlay
      loop
      resizeMode="contain"   // ✅ use string, not ResizeMode.CONTAIN
    />
  );
}

const styles = StyleSheet.create({
  video: {
    width: 100,
    height: 100,
    marginTop: -6,
  },
});
