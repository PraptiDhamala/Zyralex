import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export function HelloWave() {
  // Shared value for rotation
  const rotation = useSharedValue(0);

  // Animate rotation back and forth
  rotation.value = withRepeat(
    withTiming(25, { duration: 300 }),
    4,
    true // reverse direction
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.Image
      source={require('../assets/mimopeek.png')} 
      style={[styles.image, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    marginTop: -6,
  },
});
