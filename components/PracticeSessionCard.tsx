import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';

interface PracticeSession {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface PracticeSessionCardProps {
  session: PracticeSession;
  onPress?: (event: GestureResponderEvent) => void;
}

export const PracticeSessionCard: React.FC<PracticeSessionCardProps> = ({
  session,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        {session.icon}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{session.title}</Text>
        {session.description && (
          <Text style={styles.description}>{session.description}</Text>
        )}
      </View>
      
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.cream,
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: COLORS.darkGray,
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: COLORS.darkGray,
  },
  iconContainer: {
  width: 50,
  height: 50,
  borderRadius: 30,
  backgroundColor: COLORS.primary,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 12,
},

});
