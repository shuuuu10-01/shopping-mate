import { Category } from "@/types/category";
import { Text, View } from "../Themed";
import { StyleSheet } from "react-native";
import { NestableDraggableFlatList } from "react-native-draggable-flatlist";
import { Todo } from "@/types/todo";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Item } from "./Item";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "@/hooks/useColorScheme";

export function TodoCategory({
  category,
  completed = false,
}: {
  category?: Category;
  completed?: Todo["completed"];
}) {
  const colorScheme = useColorScheme();
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

  // 0件の場合は表示しない
  if (items.length === 0) return;

  return (
    <>
      <View style={styles.label}>
        {!completed && (
          <View
            style={[styles.circle, { borderColor: Colors[colorScheme ?? "light"].border }]}
            lightColor={category?.color || undefined}
            darkColor={category?.color || undefined}
          ></View>
        )}
        <Text style={styles.categoryName}>{categoryName()}</Text>
      </View>
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
  },
  container: {
    width: "100%",
    padding: 0,
    marginBottom: 20,
  },
  label: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 2,
    marginBottom: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
