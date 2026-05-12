import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import emojis from "../../assets/emojis.json"; // your emoji dataset

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

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: "Times New Roman",
    fontWeight: "700",
    textAlign: "center",
    color: "#011e1f",
    flex: 1,
    marginBottom: 25,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 20,
    minHeight: 50,
    minWidth: 95,
    backgroundColor: "#eee",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: { backgroundColor: "#ebd595" },
  matched: { backgroundColor: "#d5f096" },
  mimoSpeech: {
    marginTop: 10,
    padding: 5,
    backgroundColor: "#e7d8bb",
    borderRadius: 12,
    alignSelf: "center",
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 40,
  },
  mimoSpeechText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  emojiText: {
    fontSize: 48,
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});

export default function MemoryGame() {
  // pick 6 random pairs → 12 cards
  const [pairs] = useState(getRandomPairs(emojis, 6));

  // duplicate each emoji to form pairs
  const [cards] = useState(() =>
    fisherYatesShuffle(
      pairs.flatMap((p) => [
        { id: p.name + "_1", emoji: p.emoji.trim() },
        { id: p.name + "_2", emoji: p.emoji.trim() },
      ])
    )
  );

  const pathname = usePathname();
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const allMatched = matched.length === cards.length;

  const handleSelect = (itemId: string) => {
    if (selected.includes(itemId)) return;

    const newSelected = [...selected, itemId];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);

      const [first, second] = newSelected;
      const firstCard = cards.find((c) => c.id === first);
      const secondCard = cards.find((c) => c.id === second);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        setMatched((prev) => [...prev, first, second]);
      }

      setTimeout(() => setSelected([]), 400);
    }
  };

  return (
    <LinearGradient colors={["#f1adb0", "#9edbdf"]} style={styles.gradient}>
      {/* Back button */}
      <View style={{ alignItems: "flex-start", marginTop: 20 }}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Memory Card Game</Text>
      </View>

      {/* Game grid: 4 rows × 3 columns */}
      <FlatList
        data={cards}
        numColumns={3}
        extraData={matched.concat(selected)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.card,
              matched.includes(item.id) && styles.matched,
              selected.includes(item.id) && styles.selected,
            ]}
            onPress={() => handleSelect(item.id)}
            disabled={matched.includes(item.id)}
          >
            {(selected.includes(item.id) || matched.includes(item.id)) ? (
              <Text style={styles.emojiText}>{item.emoji}</Text>
            ) : (
              <Text style={{ fontSize: 28 }}>❓</Text>
            )}
          </Pressable>
        )}
      />

      {/* Mimo mascot + speech */}
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
              ? "👋 Hi, I’m Mimo! Flip two cards to begin."
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
