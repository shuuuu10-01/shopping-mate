import React from "react";
import { Link, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function _layout() {
  const colorScheme = useColorScheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "設定",
          headerLeft: () => (
            <Link asChild href="/(todo)">
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="chevron-left"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="category"
        options={{
          title: "カテゴリー設定",
          headerLeft: () => (
            <Link asChild href="/(settings)">
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="chevron-left"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="category-modal"
        options={{
          presentation: "formSheet",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
