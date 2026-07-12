import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HelloWave } from "../../components/hello-wave";
import { COLORS } from "../../constants/colors";
import { LESSON_LEVELS } from "../../constants/lessonData";
// import { USER_STATS } from '../../constants/mockData';

//ActionButton Component
function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: string | React.ReactNode;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionButtonContent}>
        <Text style={styles.actionButtonIcon}>{icon}</Text>
        <Text style={styles.actionButtonLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

// StatCard Component
function StatCard({
  icon,
  value,
  label,
}: {
  icon: string | React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <View style={styles.statCard}>
      {typeof icon === "string" ? (
        <Text style={styles.statIcon}>{icon}</Text>
      ) : (
        icon
      )}
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

//ContinueLessonItem Component
function ContinueLessonItem({
  icon,
  title,
  description,
  onPress,
}: {
  icon: string | React.ReactNode;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.continueContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.continueContent}>
        <Text style={styles.continueIcon}>{icon}</Text>
        <View style={styles.continueTextContent}>
          <Text style={styles.continueTitle}>{title}</Text>
          <Text style={styles.continueDescription}>{description}</Text>
        </View>
      </View>
      <Text style={styles.continueArrow}>→</Text>
    </TouchableOpacity>
  );
}

//LevelProgressCard (calls LevelProgressCardView)
function LevelProgressCard() {
  return <LevelProgressCardView progressPercentage={0} />;
}

//LevelProgressCardView Component
function LevelProgressCardView({
  progressPercentage,
}: {
  progressPercentage: number;
}) {
  return (
    <View style={styles.levelProgressContainer}>
      <View style={styles.levelHeader}>
        <View style={styles.levelTitleSection}>
          <View style={styles.levelBadge}>
            <Ionicons name="rocket" size={25} color="#eee2f9" />
          </View>
          <View>
            <Text style={styles.levelTitle}>Level 1</Text>
            <Text style={styles.levelSubtitle}>Beginner</Text>
          </View>
        </View>
        <View style={styles.levelXpSection}>
          <Text style={styles.levelXp}>0 XP</Text>
          <Text style={styles.levelXpNext}>100 to Level 2</Text>
        </View>
      </View>

      <View style={styles.levelProgressSection}>
        <View style={styles.levelProgressInfo}>
          <Text style={styles.levelProgressText}>0% to next level</Text>
        </View>

        <View style={styles.levelProgressBar}>
          <View
            style={[
              styles.levelProgressFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>

        <View style={styles.lessonIndicators}>
          {[...Array(6)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === 0 && styles.indicatorCompleted,
              ]}
            >
              <Text style={styles.indicatorText}>
                {index === 0 ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={25}
                    color="#f0f7f9e6"
                  />
                ) : (
                  <Ionicons name="lock-closed" size={18} color="#90bc9a" />
                )}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

// Main HomeScreen
export default function HomeScreen() {
  const router = useRouter();

  const getNextLesson = () => {
    if (!LESSON_LEVELS || !Array.isArray(LESSON_LEVELS)) {
      return null;
    }

    for (const level of LESSON_LEVELS) {
      // To ensure level and level.lessons exist before running internal loops
      if (level && Array.isArray(level.lessons)) {
        for (const lesson of level.lessons) {
          if (lesson && !lesson.completed) {
            return lesson;
          }
        }
      }
    }
    return null;
  };

  const nextLesson = getNextLesson();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <HelloWave />
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>
            Continue your learning journey
          </Text>
        </View>

        {/* Level Progress Card */}
        <LevelProgressCard />

        {/* AI Tutor Card
        <AITutorCard />
         */}

        {/* Stats Cards
        <View style={styles.statsSection}>
          <StatCard 
          icon= {<Ionicons name="flame" size={24} color="#f19238c0" />}
          value={USER_STATS.dayStreak} label="Day Streak" />
          <StatCard
            icon= {<Ionicons name="trophy" size={25} color="#fcd743" />}
            value={`${USER_STATS.bestScore}%`}
            label="Best Score"
          />
          <StatCard
           icon= {<Ionicons name="trending-up" size={25} color="#0a77d6c0" />}
            value={`+${USER_STATS.improvement}%`}
            label="Improvement"
          />
        </View> */}

        {/* Action Buttons */}
        <View style={styles.actionButtonsSection}>
          <ActionButton
            icon={<Ionicons name="book" size={24} color="#90bc9a" />}
            label="Learn"
            onPress={() => router.push("/sign/learn")}
          />
          <ActionButton
            icon={<Ionicons name="create" size={24} color="#90bc9a" />}
            label="Practice"
            onPress={() => router.push("/sign/practice")}
          />
          <ActionButton
            icon={<Ionicons name="game-controller" size={24} color="#90bc9a" />}
            label="Games"
            onPress={() => router.push("/sign/games")}
          />
        </View>

        {/* Continue Learning Section */}
        {nextLesson && (
          <View style={styles.continueSection}>
            <Text style={styles.sectionTitle}>Continue Learning</Text>
            <ContinueLessonItem
              icon={<Ionicons name="school" size={30} color="#1b1b19fc" />}
              title={nextLesson.title}
              description={nextLesson.description}
              onPress={() => router.push("/sign/learn")}
            />
          </View>
        )}

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
  },

  //Welcome
  welcomeSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  welcomeIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.darkGray,
    marginBottom: 4,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: "center",
  },

  // Level Progress Card
  levelProgressContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 4,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  levelTitleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  levelBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  levelIcon: {
    fontSize: 20,
  },
  levelTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.darkGray,
  },
  levelSubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  levelXpSection: {
    alignItems: "flex-end",
  },
  levelXp: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  levelXpNext: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  levelProgressSection: {
    marginBottom: 4,
  },
  levelProgressInfo: {
    marginBottom: 8,
  },
  levelProgressText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "500",
    textAlign: "center",
  },
  levelProgressBar: {
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 12,
  },
  levelProgressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
  },
  lessonIndicators: {
    flexDirection: "row",
    gap: 8,
  },
  indicator: {
    flex: 1,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorCompleted: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  indicatorText: {
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "700",
  },
  levelFooter: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  nextLevel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "500",
  },

  // Stats Cards
  statsSection: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "500",
  },

  // Action Buttons
  actionButtonsSection: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  actionButtonContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  actionButtonLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.darkGray,
  },

  //Continue Learning
  continueSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.darkGray,
    marginBottom: 12,
  },
  continueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  continueContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  continueIcon: {
    fontSize: 24,
  },
  continueTextContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.darkGray,
    marginBottom: 2,
  },
  continueDescription: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  continueArrow: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "700",
  },

  bottomPadding: {
    height: 40,
  },
});
