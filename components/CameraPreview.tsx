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
    width: 100, 
    height: 130, 
    borderRadius: 16, 
    overflow: 'hidden', 
    borderWidth: 2, 
    borderColor: '#4A90E2', 
    backgroundColor: '#000' 
  },
  camera: { 
    flex: 1 
  },
  fallback: { 
    width: 100, 
    height: 130, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#E0E0E0', 
    borderRadius: 16, 
    padding: 4 
  },
  text: {
    fontSize: 11,
    color: '#666'
  },
  permissionText: { 
    fontSize: 10, 
    textAlign: 'center', 
    color: '#D0021B',
    fontWeight: '600'
  },
});