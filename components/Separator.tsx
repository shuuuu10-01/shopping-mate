import { StyleSheet } from "react-native";
import { View } from "./Themed";
import Colors from "@/constants/Colors";

export function Separator() {
  return (
    <View
      style={styles.separator}
      lightColor={Colors.light.placeholderText}
      darkColor={Colors.dark.placeholderText}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 0.33,
    width: "100%",
  },
});
