import { Todo } from "@/types/todo";
import { Text } from "./Themed";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { FontAwesome } from "@expo/vector-icons";

export function TodoList({ todo }: { todo: Todo[] }) {
  const Item = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity activeOpacity={1} disabled={isActive} style={styles.item}>
          <Text>{item.title}</Text>
          <Pressable onTouchMove={drag}>
            {({ pressed }) => (
              <FontAwesome
                name="plus"
                size={30}
                color={"black"}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };
  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={todo}
        onDragEnd={({ data }) => console.log(data)}
        keyExtractor={(item) => item.id}
        renderItem={Item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingVertical: 30,
  },
  item: {
    width: "100%",
    flex: 1,
    height: 50,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    paddingHorizontal: 10,
  },
});
