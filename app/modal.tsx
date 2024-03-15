import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, TextInput, View } from "@/components/Themed";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { useEffect, useMemo, useState } from "react";
import Colors from "@/constants/Colors";
import { CATEGORIES } from "@/constants/category";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const originTodo = useAppSelector((state) =>
    selectors.todo.todoSelectors.selectById(state.todo.todo, id),
  );
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const colorScheme = useColorScheme();
  const navigate = useNavigation();

  const handlePress = () => {
    if (name === "") return;
    if (id) {
      // edit
      dispatch(actions.todo.edit({ ...originTodo, title: name, categoryId: category }));
    } else {
      // add
      dispatch(
        actions.todo.add({
          title: name,
          categoryId: category,
          completed: false,
        }),
      );
    }
    setName("");
    setCategory("");
    navigate.goBack();
  };

  const categoryName = useMemo(() => {
    const find = CATEGORIES.find((c) => c.id === category);
    return find?.name || "カテゴリー未選択";
  }, [category]);

  useEffect(() => {
    if (!id) return;
    setCategory(originTodo.categoryId);
    setName(originTodo.title);
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.close}></View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> {id ? "タスクの編集" : "タスクの追加"}</Text>
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
        <Text>商品名</Text>
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
          <View style={styles.addButton}>
            <Text
              style={{
                fontSize: 18,
                opacity: pressed ? 0.5 : 1,
              }}
            >
              {id ? "変更する" : "追加する"}
            </Text>
          </View>
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
  addButton: {
    marginTop: 30,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "rgba(118,118,128,0.12)",
  },
  separator: {
    height: 1,
    width: "100%",
  },
});
