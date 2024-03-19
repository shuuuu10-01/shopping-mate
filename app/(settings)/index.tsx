import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Link } from "expo-router";

export default function SettingScreen() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Link href="/(settings)/category">カテゴリー設定</Link>
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
});
