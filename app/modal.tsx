import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet, useColorScheme } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Text, TextInput, View } from "@/components/Themed";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { useEffect, useMemo, useState } from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import useDeleteTodo from "@/hooks/useDeleteTodo";
import { Separator } from "@/components/Separator";

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const originTodo = useAppSelector((state) =>
    selectors.todo.todoSelectors.selectById(state.todo.todo, id),
  );
  const deleteTodo = useDeleteTodo(originTodo);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const categories = useAppSelector((state) => selectors.category.sortedCategories(state.category));
  const colorScheme = useColorScheme();
  const navigate = useNavigation();
  const isEdit = !!id;

  const reset = () => {
    setName("");
    setCategory("");
    navigate.goBack();
  };

  const handleAdd = () => {
    if (name === "") return;
    if (isEdit) {
      dispatch(actions.todo.edit({ ...originTodo, title: name, categoryId: category }));
    } else {
      dispatch(
        actions.todo.add({
          title: name,
          categoryId: category,
          completed: false,
        }),
      );
    }
    reset();
  };

  const handleDelete = () => {
    deleteTodo?.();
    reset();
  };

  const categoryName = useMemo(() => {
    const find = categories.find((c) => c.id === category);
    return find?.name || "カテゴリー未選択";
  }, [category, categories]);

  useEffect(() => {
    if (!isEdit) return;
    setCategory(originTodo.categoryId);
    setName(originTodo.title);
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.close}></View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> {id ? "タスクを編集" : "タスクを追加"}</Text>
      </View>
      <Separator />
      <View style={styles.pickerLabel}>
        <Text>カテゴリー</Text>
        <View style={styles.categoryName} lightColor="#eee" darkColor="#444346">
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
        {categories.map((c) => {
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
      <Separator />
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
      <Separator />
      <Pressable onPress={handleAdd} disabled={!name}>
        {({ pressed }) => (
          <View
            style={[styles.addButton, { opacity: name ? 1 : 0.5 }]}
            lightColor="#eee"
            darkColor="#444346"
          >
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
      {isEdit && (
        <Pressable style={styles.delete} onPress={handleDelete}>
          {({ pressed }) => (
            <FontAwesome
              name="trash"
              size={30}
              color="#fff"
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      )}

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
  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
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
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  delete: {
    position: "absolute",
    bottom: 35,
    right: 35,
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
