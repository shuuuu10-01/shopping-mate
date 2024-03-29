import { Category } from "@/types/category";
import { StyleSheet, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Item } from "./Item";

export function CategoryList() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => selectors.category.sortedCategories(state.category));

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
      <DraggableFlatList
        data={categories}
        onDragEnd={({ data }) => handleDragEnd(data)}
        keyExtractor={(item) => item.id}
        renderItem={Item}
      />
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
