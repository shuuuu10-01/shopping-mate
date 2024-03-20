import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { Text, View } from "../Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Category } from "@/types/category";

export const Item = ({ item, drag, isActive }: RenderItemParams<Category>) => {
  const colorScheme = useColorScheme();

  return (
    <ScaleDecorator activeScale={1}>
      <View
        style={[
          styles.item,
          {
            borderStyle: isActive ? "dotted" : "solid",
            borderColor: Colors[colorScheme ?? "light"].border,
          },
        ]}
      >
        <Link asChild href={{ pathname: "/(settings)/category-modal", params: { id: item.id } }}>
          <Pressable disabled={isActive} style={styles.circleWrapper}>
            <View
              style={[styles.circle, { borderColor: Colors[colorScheme ?? "light"].border }]}
              lightColor={item.color}
              darkColor={item.color}
            ></View>
            <Text>{item.name}</Text>
          </Pressable>
        </Link>

        <Pressable onLongPress={drag} disabled={isActive} style={styles.dragButton}>
          {({ pressed }) => (
            <FontAwesome
              name="bars"
              size={20}
              color={Colors[colorScheme ?? "light"].placeholderText}
              style={{
                opacity: pressed || isActive ? 1 : 0.5,
              }}
            />
          )}
        </Pressable>
      </View>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    flex: 1,
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    borderWidth: 0.5,
    gap: 15,
    overflow: "hidden",
  },
  circleWrapper: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderStyle: "solid",
    marginLeft: 15,
    marginRight: 10,
  },
  dragButton: {
    display: "flex",
    width: 35,
    height: "100%",
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
