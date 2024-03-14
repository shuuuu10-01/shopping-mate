import { Category } from "@/types/category";
import { Text } from "../Themed";
import { StyleSheet } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { Todo } from "@/types/todo";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Item } from "./Item";

export function TodoCategory({ category }: { category: Category }) {
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

  const items = useAppSelector((state) =>
    selectors.todo.sortedTodoByCategoryId(state.todo, category.id),
  );
  return (
    <>
      <Text style={styles.categoryName}>{category.name}</Text>
      <NestableDraggableFlatList<Todo>
        data={items}
        onDragEnd={({ data }) => handleDragEnd(data)}
        keyExtractor={({ id }) => id}
        renderItem={Item}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
