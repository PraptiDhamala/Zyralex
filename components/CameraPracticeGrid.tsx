import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { CAMERA_PRACTICE_ITEMS } from '../constants/mockData';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = (SCREEN_WIDTH - 48) / 2; // 2 columns with padding

export const CameraPracticeGrid: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Practice</Text>
      <Text style={styles.subtitle}>Test your signs with AI recognition</Text>

      <View style={styles.grid}>
        {CAMERA_PRACTICE_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridItem}
            activeOpacity={0.7}
             onPress={() => {
    router.push({
      pathname: '/sign/CameraPracticeScreen',
      params: { lessonId: item.lessonId ,levelId:item.levelId},
    });
    }}
          >
            <View style={styles.itemContent}>
              <Text style={styles.handIcon}>👋</Text>
              <Text style={styles.itemLabel}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.darkGray,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: ITEM_WIDTH,
    aspectRatio: 1,
    backgroundColor: COLORS.cream,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  handIcon: {
    fontSize: 48,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkGray,
  },
});
