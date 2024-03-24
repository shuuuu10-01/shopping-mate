import { StyleSheet, View } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { TodoCategory } from "./TodoCategory";
import { selectors, useAppSelector } from "@/redux";

export function TodoList() {
  const categories = useAppSelector((state) => selectors.category.sortedCategories(state.category));
  return (
    <View style={styles.wrapper}>
      <NestableScrollContainer>
        {categories.map((c) => {
          return <TodoCategory key={c.id} category={c} />;
        })}
        <TodoCategory category={undefined} />
        <TodoCategory completed />
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
});
