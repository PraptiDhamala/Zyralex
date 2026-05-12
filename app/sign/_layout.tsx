import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function SignLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "Practice",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="games"
        options={{
          title: "Games",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen name="CameraPracticeScreen" options={{ href: null }} />
    </Tabs>
  );
}
