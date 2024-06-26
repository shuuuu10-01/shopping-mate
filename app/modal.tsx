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
import useEditTodo from "@/hooks/useEditTodo";

export default function ModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const originTodo = useAppSelector((state) =>
    selectors.todo.todoSelectors.selectById(state.todo.todo, id),
  );
  const deleteTodo = useDeleteTodo(originTodo);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const categories = useAppSelector((state) => selectors.category.sortedCategories(state.category));
  const colorScheme = useColorScheme();
  const navigate = useNavigation();
  const isEdit = !!id;
  const onEditTodo = useEditTodo(originTodo);

  const reset = () => {
    setName("");
    setCategoryId("");
    navigate.goBack();
  };

  const handleSubmit = () => {
    if (name === "") return;
    if (isEdit) {
      onEditTodo?.(name, categoryId);
    } else {
      dispatch(
        actions.todo.add({
          title: name,
          categoryId: categoryId,
          completed: false,
          createdAt: new Date().toISOString(),
        }),
      );
    }
    reset();
  };

  const handleDelete = () => {
    deleteTodo?.();
    reset();
  };

  const selectedCategory = useMemo(() => {
    return categories.find((c) => c.id === categoryId);
  }, [categoryId, categories]);

  useEffect(() => {
    if (!isEdit) return;
    setCategoryId(originTodo.categoryId);
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
          {selectedCategory && (
            <View
              style={styles.circle}
              lightColor={selectedCategory.color || Colors[colorScheme ?? "light"].border}
              darkColor={selectedCategory.color || Colors[colorScheme ?? "light"].border}
            ></View>
          )}
          <Text>{selectedCategory ? selectedCategory.name : "カテゴリー未選択"}</Text>
        </View>
      </View>
      <Picker
        style={{ width: "100%" }}
        selectedValue={categoryId}
        onValueChange={(itemValue) => setCategoryId(itemValue)}
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
              style={{ fontWeight: "600" }}
            ></Picker.Item>
          );
        })}
      </Picker>
      <Separator />
      <View style={styles.titleLabel}>
        <Text>タスク名</Text>
        <TextInput
          style={styles.titleInput}
          value={name}
          onChangeText={setName}
          blurOnSubmit
          enterKeyHint="done"
          placeholder="タスク名を入力してください"
        ></TextInput>
      </View>
      <Separator />
      <Pressable onPress={handleSubmit} disabled={!name}>
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
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
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
