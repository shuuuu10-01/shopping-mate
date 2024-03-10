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
    return find?.name || "カテゴリー未選択";
  }, [category]);

  return (
    <View style={styles.container}>
      <View style={styles.close}></View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todoの追加</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.pickerLabel}>
        <Text>カテゴリー</Text>
        <View style={[styles.categoryName, { backgroundColor: "rgba(118,118,128,0.12)" }]}>
          <Text>{categoryName}</Text>
        </View>
      </View>
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
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.titleLabel}>
        <Text>タイトル</Text>
        <TextInput
          style={styles.titleInput}
          value={name}
          onChangeText={setName}
          blurOnSubmit
          enterKeyHint="done"
          placeholder="タイトルを入力してください"
        ></TextInput>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
  },
  close: {
    width: 36,
    height: 5,
    marginTop: 5,
    marginBottom: 4,
    borderRadius: 2.5,
    backgroundColor: "#3C3C43",
  },
  header: { display: "flex", justifyContent: "center", alignItems: "center", height: 44 },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  pickerLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 44,
  },
  categoryName: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 6,
  },
  titleLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 44,
  },
  titleInput: {
    padding: 10,
    margin: 12,
    height: 40,
  },
  separator: {
    height: 1,
    width: "100%",
  },
});
