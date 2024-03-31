import { Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TodoList } from "@/components/TodoList";
import { Link } from "expo-router";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <TodoList />
      <Link href="/modal" asChild>
        <Pressable
          style={{
            ...styles.add,
            backgroundColor: Colors[colorScheme ?? "light"].background,
            borderColor: Colors[colorScheme ?? "light"].placeholderText,
          }}
        >
          {({ pressed }) => (
            <MaterialIcons
              name="add"
              size={30}
              color={Colors[colorScheme ?? "light"].text}
              style={{ opacity: pressed ? 0.5 : 1 }}
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
    paddingTop: 15,
  },
  add: {
    position: "absolute",
    bottom: 35,
    right: 35,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
