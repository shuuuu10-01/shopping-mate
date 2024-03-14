import { Todo } from "@/types/todo";
import { Text } from "@/components/Themed";
import { StyleSheet, View } from "react-native";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { useMemo } from "react";
import { CATEGORIES } from "@/constants/category";
import { Item } from "./Item";

export function TodoList() {
  const todo = useAppSelector((state) => selectors.todo.sampleSelector(state.todo));
  const ordered = useMemo(() => {
    return [...todo].sort((a, b) => (a.order > b.order ? 1 : -1));
  }, [todo]);

  const dispatch = useAppDispatch();
  const handleDragEnd = (dragEndTodo: Todo[]) => {
    const converted: Todo[] = dragEndTodo.map((d, index) => {
      return {
        ...d,
        order: index,
      };
    });
    dispatch(actions.todo.setMany(converted));
  };

  return (
    <View style={styles.wrapper}>
      <NestableScrollContainer>
        {CATEGORIES.map((c) => {
          return (
            <>
              <Text style={styles.categoryName}>{c.name}</Text>
              <NestableDraggableFlatList<Todo>
                data={ordered}
                onDragEnd={({ data }) => handleDragEnd(data)}
                keyExtractor={({ id }) => id}
                renderItem={Item}
                style={styles.container}
              />
            </>
          );
        })}
      </NestableScrollContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "80%",
    display: "flex",
    alignItems: "center",
  },
  categoryName: {
    fontSize: 18,
    marginBottom: 5,
  },
  container: {
    width: "100%",
    padding: 0,
    marginBottom: 20,
  },
});
