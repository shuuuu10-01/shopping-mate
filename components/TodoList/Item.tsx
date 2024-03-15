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
            borderStyle: isActive ? "dotted" : "solid",
            borderColor: Colors[colorScheme ?? "light"].border,
          },
        ]}
      >
        <View style={styles.checkWrapper}>
          <Pressable onPress={() => handleToggleCheck(item)} disabled={isActive}>
            {() => (
              <FontAwesome
                name={item.completed ? "check-square" : "square-o"}
                size={25}
                color={Colors[colorScheme ?? "light"].text}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => router.push({ pathname: "/modal", params: { id: item.id } })}
            disabled={isActive}
          >
            <Text>{item.title}</Text>
          </Pressable>
        </View>
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
      </View>
    </ScaleDecorator>
  );
};

const styles = StyleSheet.create({
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
  dragButton: {
    display: "flex",
    width: 35,
    height: "100%",
    paddingRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});
