// We have completely removed the 'expo-face-detector' import from this file.
// This empty object prevents Expo Go from looking for a missing native module.
export const faceDetectorOptions: any = {};

// We keep this interface empty so that the other components referencing 
// FaceData can still compile without throwing an "Undefined Type" error.
export interface FaceData {}