import { Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { TodoList } from "@/components/TodoList";
import { Link } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <TodoList />
      <Link href="/modal" asChild>
        <Pressable style={styles.add}>
          {({ pressed }) => (
            <FontAwesome
              name="plus-circle"
              size={60}
              color={Colors[colorScheme ?? "light"].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
  },
  add: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
