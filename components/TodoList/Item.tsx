import { Todo } from "@/types/todo";
import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { Text, View } from "../Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { actions, useAppDispatch } from "@/redux";
import { router } from "expo-router";

export const Item = ({ item, drag, isActive }: RenderItemParams<Todo>) => {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const handleToggleCheck = (item: Todo) => {
    dispatch(actions.todo.toggle(item));
  };

  return (
    <ScaleDecorator activeScale={1}>
      <View
        style={[
          styles.item,
          {
            borderColor: Colors[colorScheme ?? "light"].placeholderText,
          },
        ]}
      >
        <View style={styles.checkWrapper}>
          <Pressable
            style={styles.checkbox}
            disabled={isActive}
            onPress={() => handleToggleCheck(item)}
          >
            {item.completed ? (
              <FontAwesome
                name="check-square"
                size={25}
                color={Colors[colorScheme ?? "light"].text}
              />
            ) : (
              <FontAwesome
                name="square-o"
                size={25}
                color={Colors[colorScheme ?? "light"].placeholderText}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => router.push({ pathname: "/modal", params: { id: item.id } })}
            disabled={isActive}
            style={styles.title}
          >
            <Text>{item.title}</Text>
          </Pressable>
        </View>
        {/* 完了済みの場合はソートボタンは非表示 */}
        {item.completed ? (
          <View style={styles.dragButton}></View>
        ) : (
          <Pressable onLongPress={drag} disabled={isActive} style={styles.dragButton}>
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
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    flex: 1,
    minHeight: 50,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    borderWidth: 1,
    gap: 15,
    overflow: "hidden",
  },
  checkWrapper: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkbox: {
    width: 50,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 15,
    paddingRight: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  dragButton: {
    display: "flex",
    width: 35,
    height: "100%",
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
