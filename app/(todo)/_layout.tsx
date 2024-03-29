import React from "react";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function _layout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        title: "Shopping Mate",
        headerRight: () => (
          <Link href="/(settings)" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="gear"
                  size={25}
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
