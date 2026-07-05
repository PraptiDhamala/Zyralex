import { CameraView, useCameraPermissions } from 'expo-camera';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { faceDetectorOptions } from '../services/faceDetection';

interface CameraPreviewProps {
  onFacesDetected: (faces: any[]) => void;
}

export const CameraPreview: React.FC<CameraPreviewProps> = ({ onFacesDetected }) => {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.text}>Initializing...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.permissionText} onPress={requestPermission}>
          Grant Camera Permission
        </Text>
      </View>
    );
  }

  // Type-cast the underlying configuration object to prevent modern Expo SDK signature strictness warnings
  const nativeCameraProps: any = {
    style: styles.camera,
    facing: "front",
    onFacesDetected: (e: { faces: any[] }) => onFacesDetected(e.faces),
    faceDetectorSettings: faceDetectorOptions,
  };

  return (
    <View style={styles.container}>
      <CameraView {...nativeCameraProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    // CHANGED: Force the container to take the full space of the green parent box
    width: '100%', 
    height: '100%', 
    position: 'absolute', // Ensures it stays in the background of the green box
    top: 0,
    left: 0,
    overflow: 'hidden', 
    backgroundColor: '#000' 
  },
  camera: { 
    flex: 1 
  },
  fallback: { 
    // CHANGED: Make the fallback screens fill the space as well
    width: '100%', 
    height: '100%', 
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#E0E0E0', 
    padding: 4 
  },
  text: {
    fontSize: 14,
    color: '#666'
  },
  permissionText: { 
    fontSize: 14, 
    textAlign: 'center', 
    color: '#D0021B',
    fontWeight: '600'
  },
});