import { Pressable, StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import React from "react";
import { CategoryList } from "@/components/CategoryList";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function CategoryScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <CategoryList />
      <Link href="/(settings)/category-modal" asChild>
        <Pressable style={styles.add}>
          {({ pressed }) => (
            <FontAwesome5
              name="folder-plus"
              size={30}
              color="#fff"
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
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 15,
  },
  add: {
    position: "absolute",
    width: 60,
    height: 60,
    bottom: 35,
    right: 35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#1C1C1E",
  },
});
