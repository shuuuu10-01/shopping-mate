import { StyleSheet, View } from "react-native";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { TodoCategory, SortableTodoCategory } from "./TodoCategory";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Category } from "@/types/category";

export function TodoList() {
  const categories = useAppSelector((state) => selectors.category.sortedCategories(state.category));

  const dispatch = useAppDispatch();
  const handleDragEnd = (dragEndCategory: Category[]) => {
    const converted: Category[] = dragEndCategory.map((d, index) => {
      return {
        ...d,
        order: index,
      };
    });
    dispatch(actions.category.setMany(converted));
  };

  return (
    <View style={styles.wrapper}>
      <NestableScrollContainer style={{ width: "100%" }}>
        <NestableDraggableFlatList<Category>
          data={categories}
          onDragEnd={({ data }) => handleDragEnd(data)}
          keyExtractor={({ id }) => id}
          renderItem={SortableTodoCategory}
        />
        <TodoCategory sortable={false} completed={false} />
        <TodoCategory sortable={false} completed />
      </NestableScrollContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});
