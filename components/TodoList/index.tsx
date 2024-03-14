import { Todo } from "@/types/todo";
import { Text } from "@/components/Themed";
import { Pressable, StyleSheet, View } from "react-native";
import {
  ScaleDecorator,
  RenderItemParams,
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { FontAwesome } from "@expo/vector-icons";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { useMemo } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { CATEGORIES } from "@/constants/category";

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
      <ScaleDecorator activeScale={1}>
        <View
          style={[
            styles.item,
            {
              borderStyle: isActive ? "dotted" : "solid",
              borderColor: Colors[colorScheme ?? "light"].border,
            },
          ]}
        >
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
          <Pressable
            onLongPress={drag}
            disabled={isActive}
            style={{
              display: "flex",
              width: 35,
              height: "100%",
              paddingRight: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {({ pressed }) => (
              <FontAwesome
                name="bars"
                size={20}
                color={Colors[colorScheme ?? "light"].placeholderText}
                style={{
                  opacity: pressed || isActive ? 1 : 0.5,
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
      <NestableScrollContainer>
        {CATEGORIES.map((c) => {
          return (
            <>
              <Text style={styles.categoryName}>{c.name}</Text>
              <NestableDraggableFlatList<Todo>
                data={ordered}
                onDragEnd={({ data }) => handleDragEnd(data)}
                keyExtractor={({ id }) => id}
                renderItem={Item}
                style={styles.container}
              />
            </>
          );
        })}
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
  categoryName: {
    fontSize: 18,
    marginBottom: 5,
  },
  container: {
    width: "100%",
    padding: 0,
    marginBottom: 20,
  },
  item: {
    width: "100%",
    flex: 1,
    minHeight: 50,
    paddingVertical: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    borderWidth: 0.5,
    gap: 35,
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
