import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function _layout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        title: "Shopping Mate",
        headerRight: () => (
          <Link href="/category-modal" asChild>
            <Pressable>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="folder-plus"
                  size={30}
                  color={Colors[colorScheme ?? "light"].text}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }}
    ></Stack>
  );
}
