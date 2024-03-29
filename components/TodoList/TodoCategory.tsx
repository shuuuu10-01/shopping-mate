import { Category } from "@/types/category";
import { Text } from "../Themed";
import { StyleSheet } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { Todo } from "@/types/todo";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Item } from "./Item";

export function TodoCategory({
  category,
  completed = false,
}: {
  category?: Category;
  completed?: Todo["completed"];
}) {
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

  const items = useAppSelector((state) => {
    if (completed) return selectors.todo.completedTodo(state.todo);

    return selectors.todo.sortedTodoByCategoryId(state.todo, category?.id || "");
  });

  const categoryName = () => {
    if (category) return category.name;
    return completed ? "完了済み" : "カテゴリー未選択";
  };

  // 完了済みやカテゴリー未選択 かつ 0件の場合は表示しない
  if ((completed || category === undefined) && items.length === 0) return;

  return (
    <>
      <Text style={styles.categoryName}>{categoryName()}</Text>
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
