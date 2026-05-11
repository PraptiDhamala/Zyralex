import { Camera, CameraView } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CameraPracticeScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front" />

      {/* Reference sign image in top-right corner */}
      <View style={styles.overlay}>
        <Image
          source={require('../../assets/mimoimg.png')}
          style={styles.signImage}
        />
        <Text style={styles.caption}>Practice Sign</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    top: 20,
    right: 20,
    alignItems: 'center',
  },
  signImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
