import { Todo } from "@/types/todo";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import React from "react";

export function TodoList({ todo }: { todo: Todo[] }) {
  return (
    <View style={styles.container}>
      {todo.map((t) => {
        return <Item key={t.id} item={t} />;
      })}
    </View>
  );
}

function Item({ item }: { item: Todo }) {
  return (
    <View lightColor="#fff" darkColor="#ccc" style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  item: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    paddingHorizontal: 10,
  },
});
