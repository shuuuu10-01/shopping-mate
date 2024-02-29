import { Pressable, StyleSheet } from "react-native";

import { Text, View, TextInput } from "@/components/Themed";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { actions, useAppDispatch, useAppSelector } from "@/redux";

export default function TabOneScreen() {
  const { todo } = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const colorScheme = useColorScheme();

  const handlePress = () => {
    dispatch(
      actions.todo.pushTodo({
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
      {todo.map((t, index) => {
        return <Text key={index}>{t.title}</Text>;
      })}
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
