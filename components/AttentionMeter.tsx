import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface AttentionMeterProps {
  score: number;
}

export const AttentionMeter: React.FC<AttentionMeterProps> = ({ score }) => {
  let color = '#D0021B';
  let assessment = 'Low Attention';

  if (score >= 85) { 
    color = '#4CD964'; 
    assessment = 'Excellent'; 
  } else if (score >= 70) { 
    color = '#FFCC00'; 
    assessment = 'Good Focus'; 
  } else if (score >= 50) { 
    color = '#FF9500'; 
    assessment = 'Needs Practice'; 
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Attention Tracker: </Text>
        <Text style={[styles.status, { color }]}>{assessment} ({score}%)</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', marginVertical: 12, paddingHorizontal: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, fontWeight: '600', color: '#333' },
  status: { fontSize: 14, fontWeight: '700' },
  track: { height: 10, width: '100%', backgroundColor: '#E5E5EA', borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 5 },
});