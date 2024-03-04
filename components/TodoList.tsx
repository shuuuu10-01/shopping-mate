import { Todo } from "@/types/todo";
import { Text } from "./Themed";
import { Pressable, StyleSheet, View } from "react-native";

import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { FontAwesome } from "@expo/vector-icons";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { useMemo } from "react";

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

  const Item = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <View style={styles.item}>
          <Text>{item.title}</Text>
          <Pressable onLongPress={drag} disabled={isActive}>
            {({ pressed }) => (
              <FontAwesome
                name="bars"
                size={20}
                color={"black"}
                style={{ marginRight: 15, opacity: pressed || isActive ? 0.5 : 1 }}
              />
            )}
          </Pressable>
        </View>
      </ScaleDecorator>
    );
  };
  return (
    <View style={styles.wrapper}>
      <DraggableFlatList<Todo>
        data={ordered}
        onDragEnd={({ data }) => handleDragEnd(data)}
        keyExtractor={({ id }) => id}
        renderItem={Item}
        style={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: 0,
    margin: 0,
  },
  item: {
    width: "100%",
    flex: 1,
    height: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    borderWidth: 0.5,
    paddingLeft: 10,
  },
});
