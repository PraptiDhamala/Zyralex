import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function LearnScreen() {
  const [level, setLevel] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = [
    {
      question: "What do plants need to make food?",
      options: ["Sunlight", "Plastic", "Metal"],
      answer: "Sunlight",
    },
    {
      question: "Which planet do we live on?",
      options: ["Mars", "Earth", "Jupiter"],
      answer: "Earth",
    },
    {
      question: "What color is the sky?",
      options: ["Blue", "Green", "Purple"],
      answer: "Blue",
    },
  ];

  const handleAnswer = async (selected: string) => {
    let updatedScore = score;

    if (selected === questions[currentQuestion].answer) {
      updatedScore += 1;
      setScore(updatedScore);
    }

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setFinished(true);

      const mistakes = questions.length - updatedScore;

      const reading_speed = 1;

      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            score: updatedScore * 30,
            mistakes,
            reading_speed,
          }),
        });

        const data = await response.json();

        console.log(data);

        setLevel(data.level);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setFinished(false);
    setLevel("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dyslexia Personalized Learning</Text>

      {!finished && (
        <View style={styles.quizContainer}>
          <Text style={styles.question}>
            {questions[currentQuestion].question}
          </Text>

          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={() => handleAnswer(option)}
            >
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {finished && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Recommended Level: {level}</Text>

          {level === "easy" && (
            <Text style={styles.lesson}>
              Plants use sunlight to make food.
              {"\n\n"}
              Water helps plants grow.
              {"\n\n"}
              Leaves collect sunlight.
            </Text>
          )}

          {level === "medium" && (
            <Text style={styles.lesson}>
              Photosynthesis helps plants create energy using sunlight, water,
              and air.
            </Text>
          )}

          {level === "hard" && (
            <Text style={styles.lesson}>
              Photosynthesis is the biochemical process through which plants
              synthesize glucose using sunlight, carbon dioxide, and water.
            </Text>
          )}

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 40,
    textAlign: "center",
  },

  quizContainer: {
    width: "100%",
    alignItems: "center",
  },

  question: {
    fontSize: 28,
    lineHeight: 42,
    textAlign: "center",
    marginBottom: 30,
    color: "#334155",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#2563EB",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  resultContainer: {
    width: "100%",
    alignItems: "center",
  },

  result: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#0F172A",
    textAlign: "center",
  },

  lesson: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 25,
    borderRadius: 20,
    fontSize: 24,
    lineHeight: 42,
    letterSpacing: 1.2,
    color: "#334155",
    textAlign: "center",
    marginBottom: 30,
  },

  restartButton: {
    backgroundColor: "#0F172A",
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 16,
  },
});
