import { StyleSheet, View } from "react-native";
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { TodoCategory, SortableTodoCategory } from "./TodoCategory";
import { selectors, useAppSelector } from "@/redux";
import { Category } from "@/types/category";

export function TodoList() {
  const categories = useAppSelector((state) => selectors.category.sortedCategories(state.category));
  return (
    <View style={styles.wrapper}>
      <NestableScrollContainer>
        <NestableDraggableFlatList<Category>
          data={categories}
          onDragEnd={({ data }) => console.log(data)}
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
