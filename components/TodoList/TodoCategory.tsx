import { Category } from "@/types/category";
import { Text, View } from "../Themed";
import { Pressable, StyleSheet } from "react-native";
import {
  NestableDraggableFlatList,
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { Todo } from "@/types/todo";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Item } from "./Item";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";

type Props =
  | ({
      sortable: true;
      category: Category;
      completed?: undefined;
    } & RenderItemParams<Category>)
  | ({
      sortable: false;
      category?: undefined;
      completed: boolean;
    } & Partial<RenderItemParams<Category>>);

export function TodoCategory({ sortable, category, completed, drag, isActive }: Props) {
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

  // 入れ替え可能項目以外で0件の場合は表示しない
  if (!sortable && items.length === 0) return;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.title, { marginBottom: items.length === 0 ? 0 : 10 }]}>
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
        {sortable && (
          <Pressable onLongPress={drag} style={styles.dragButton} disabled={isActive}>
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
        )}
      </View>
      <NestableDraggableFlatList<Todo>
        data={items}
        onDragEnd={({ data }) => handleDragEnd(data)}
        keyExtractor={({ id }) => id}
        renderItem={Item}
        style={styles.container}
      />
    </View>
  );
}

export const SortableTodoCategory = (props: RenderItemParams<Category>) => {
  return (
    <ScaleDecorator activeScale={1}>
      <TodoCategory sortable category={props.item} {...props} />
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
    marginLeft: 2,
  },
  label: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  categoryName: {
    fontSize: 18,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  dragButton: {
    display: "flex",
    width: 35,
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
    padding: 0,
  },
});
