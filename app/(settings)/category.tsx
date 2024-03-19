import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function CategoryScreen() {
  const colorScheme = useColorScheme();

  return <View style={styles.container}></View>;
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
