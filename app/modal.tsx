import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, TextInput, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";
import { actions, useAppDispatch } from "@/redux";
import { useMemo, useState } from "react";
import Colors from "@/constants/Colors";
import { CATEGORIES } from "@/constants/category";

export default function ModalScreen() {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const colorScheme = useColorScheme();

  const handlePress = () => {
    if (name === "") return;
    dispatch(
      actions.todo.add({
        title: name,
        categoryId: "1",
        completed: false,
      }),
    );
    setName("");
  };

  const categoryName = useMemo(() => {
    const find = CATEGORIES.find((c) => c.id === category);
    return find?.name || "未選択";
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.pickerLabel}>
        <Text style={styles.labelTitle}>カテゴリー</Text>
        <Text style={styles.categoryName}>{categoryName}</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Picker
        style={{ width: "100%" }}
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item
          label="カテゴリー未選択"
          value=""
          color={Colors[colorScheme ?? "light"].text}
        ></Picker.Item>
        {CATEGORIES.map((c) => {
          return (
            <Picker.Item
              key={c.id}
              label={c.name}
              value={c.id}
              color={Colors[colorScheme ?? "light"].text}
            ></Picker.Item>
          );
        })}
      </Picker>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        blurOnSubmit
        enterKeyHint="done"
        placeholder="TODOを入力してください"
      />
      <Pressable onPress={handlePress}>
        {({ pressed }) => (
          <FontAwesome
            name="plus"
            size={30}
            color={Colors[colorScheme ?? "light"].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  pickerLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
  },
  labelTitle: { fontSize: 16 },
  categoryName: {
    fontSize: 20,
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "90%",
  },
});
