import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import emojis from "../../assets/emojis.json";

function fisherYatesShuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getRandomPairs<T>(source: T[], count: number): T[] {
  const shuffled = fisherYatesShuffle(source);
  return shuffled.slice(0, count);
}

// ⭐ NEW: ensures no correct pair appears in same row
function shuffleAvoidingMatches(
  names: string[],
  emojis: string[],
  pairs: { name: string; emoji: string }[]
) {
  let shuffledEmojis = [...emojis];
  let hasMatch = true;

  while (hasMatch) {
    shuffledEmojis = fisherYatesShuffle(shuffledEmojis);

    hasMatch = names.some((name, index) => {
      const emoji = shuffledEmojis[index];
      return pairs.some(
        (p) => p.name === name && p.emoji === emoji
      );
    });
  }

  return shuffledEmojis;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  backArrow: { fontSize: 28, marginRight: 10, color: "#fff" },
  title: {
    fontSize: 30,
    fontFamily: "Times New Roman",
    fontWeight: "700",
    textAlign: "center",
    color: "#011e1f",
    flex: 1,
    marginBottom: 25,
  },
  row: { flexDirection: "row", flex: 1 },
  column: { flex: 1 },
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
  },
  emojiText: { fontSize: 30 },
  nameText: { fontSize: 30 },
  selected: { backgroundColor: "#ebd595" },
  matched: { backgroundColor: "#d5f096" },
  mimoSpeech: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#e7d8bb",
    borderRadius: 12,
    alignSelf: "center",
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 60,
  },
  mimoSpeechText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});

export default function MatchGame() {
  const pathname = usePathname();

  const [pairs] = useState(getRandomPairs(emojis, 4));
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  // ✅ Shuffle names FIRST
  const [names] = useState(() =>
    fisherYatesShuffle(pairs.map((p) => p.name))
  );

  // ✅ Shuffle emojis WITHOUT same-row matches
  const [emojisOnly] = useState(() =>
    shuffleAvoidingMatches(
      names,
      pairs.map((p) => p.emoji),
      pairs
    )
  );

  const allMatched = matched.length === pairs.length * 2;

  const handleSelect = (item: string) => {
    if (selected.includes(item)) return;

    const newSelected = [...selected, item];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);

      const [first, second] = newSelected;

      const match = pairs.find(
        (p) =>
          (p.name === first && p.emoji === second) ||
          (p.name === second && p.emoji === first)
      );

      if (match) {
        setMatched((prev) => [...prev, match.name, match.emoji]);
      }

      setTimeout(() => setSelected([]), 400); // smoother UX
    }
  };

  return (
    <LinearGradient colors={["#f1adb0", "#9edbdf"]} style={styles.gradient}>
      
      {/* Back button */}
      <View style={{ alignItems: "flex-end", marginTop: 10 }}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backArrow}>{"x"}</Text>
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Match the Following</Text>
      </View>

      {/* Game grid */}
      <View style={styles.row}>
        <FlatList
          data={names}
          extraData={matched.concat(selected)}
          keyExtractor={(item, index) => "name-" + index}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.card,
                matched.includes(item) && styles.matched,
                selected.includes(item) && styles.selected,
              ]}
              onPress={() => handleSelect(item)}
              disabled={matched.includes(item)}
            >
              <Text style={styles.nameText}>{item}</Text>
            </Pressable>
          )}
        />

        <FlatList
          data={emojisOnly}
          extraData={matched.concat(selected)}
          keyExtractor={(item, index) => "emoji-" + index}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.card,
                matched.includes(item) && styles.matched,
                selected.includes(item) && styles.selected,
              ]}
              onPress={() => handleSelect(item)}
              disabled={matched.includes(item)}
            >
              <Text style={styles.emojiText}>{item}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* Mimo mascot */}
      <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 20 }}>
        <Image
          source={require("../../assets/mimoimg.png")}
          style={{ width: 70, height: 80 }}
          resizeMode="cover"
        />

        <View style={styles.mimoSpeech}>
          <Text style={styles.mimoSpeechText}>
            {allMatched
              ? "🎉 Congratulations! You matched them all!"
              : moves === 0
              ? "👋 Hi, I’m Mimo! Match the names with the emojis to begin."
              : `You’ve made ${moves} moves so far!`}
          </Text>

          {allMatched && (
            <Pressable
              style={{
                marginTop: 5,
                padding: 6,
                backgroundColor: "#318ef8",
                borderRadius: 8,
              }}
              onPress={() => router.replace(pathname as any)}
            >
              <Text style={{ color: "#fff", fontWeight: "600", textAlign: "center" }}>
                Play Again
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Confetti */}
      {allMatched && (
        <ConfettiCannon count={70} origin={{ x: 200, y: 0 }} fadeOut />
      )}
    </LinearGradient>
  );
}