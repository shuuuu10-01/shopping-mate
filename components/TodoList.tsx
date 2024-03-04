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
import { useColorScheme } from "./useColorScheme";
import Colors from "@/constants/Colors";

export function TodoList() {
  const colorScheme = useColorScheme();
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

  const handleToggleCheck = (item: Todo) => {
    dispatch(actions.todo.toggle(item));
  };

  const Item = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
    return (
      <ScaleDecorator>
        <View style={[styles.item, { borderColor: Colors[colorScheme ?? "light"].border }]}>
          <Pressable
            style={styles.checkWrapper}
            onPress={() => handleToggleCheck(item)}
            disabled={isActive}
          >
            {() => (
              <>
                <FontAwesome
                  name={item.completed ? "check-square" : "square-o"}
                  size={25}
                  color={Colors[colorScheme ?? "light"].text}
                />
                <Text>{item.title}</Text>
              </>
            )}
          </Pressable>
          <Pressable onLongPress={drag} disabled={isActive}>
            {({ pressed }) => (
              <FontAwesome
                name="bars"
                size={20}
                color={Colors[colorScheme ?? "light"].placeholderText}
                style={{
                  opacity: pressed || isActive ? 1 : 0.5,
                  paddingVertical: 12.5,
                  paddingHorizontal: 15,
                }}
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
  },
  checkWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 15,
    flex: 1,
  },
});
