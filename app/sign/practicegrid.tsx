import { useSignModule } from '@/hooks/useSignModule';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CameraCollapsible } from '../../components/Cameracollaspible';
import { COLORS } from '../../constants/colors';


export default function CameraPracticeScreen() {
  const{ levels, loading, error } = useSignModule();
  if (loading) return <ActivityIndicator style={{ marginTop:40 }} />;
  if (error) return <Text style={{ margin:16 }}> {error} </Text>
    
  return (
     <ScrollView style={{ flex: 1 ,backgroundColor: COLORS.white,}}>
      <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Camera Practice Sessions</Text>
              </View>

    <View style={styles.lessonsContainer}>
      {levels.map((lvl) => (
        <CameraCollapsible key={lvl.levelId} level={lvl} />
      ))}
    </View>  
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  lessonsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  marginBottom:20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primary,}
});
