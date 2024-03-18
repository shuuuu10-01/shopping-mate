import { StyleSheet, View } from "react-native";
import { NestableScrollContainer } from "react-native-draggable-flatlist";
import { CATEGORIES } from "@/constants/category";
import { TodoCategory } from "./TodoCategory";

export function TodoList() {
  return (
    <View style={styles.wrapper}>
      <NestableScrollContainer>
        {CATEGORIES.map((c) => {
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
