import { Pressable, StyleSheet } from "react-native";

import { View, TextInput } from "@/components/Themed";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { TodoList } from "@/components/TodoList";

export default function TabOneScreen() {
  const todo = useAppSelector((state) => selectors.todo.sampleSelector(state.todo));
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const colorScheme = useColorScheme();

  const handlePress = () => {
    if (title === "") return;
    dispatch(
      actions.todo.add({
        title: title,
        completed: false,
      }),
    );
    setTitle("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
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
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 4,
  },
});
