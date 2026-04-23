// app/sign/_layout.tsx
import { Tabs } from "expo-router";

export default function SignLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="learn" options={{ title: "Learn" }} />
      <Tabs.Screen name="practice" options={{ title: "Practice" }} />
      <Tabs.Screen name="games" options={{ title: "Games" }} />
    </Tabs>
  );
}
