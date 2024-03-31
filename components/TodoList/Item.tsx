import { Todo } from "@/types/todo";
import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { Text, View } from "../Themed";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LayoutAnimation, Pressable, StyleSheet, UIManager } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { actions, useAppDispatch } from "@/redux";
import { router } from "expo-router";
import { useEffect, useState } from "react";

// アニメーションの設定
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export function Item({ item, drag, isActive, getIndex }: RenderItemParams<Todo>) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(item.completed);

  const handleToggleCheck = () => {
    setExpanded(true);
    setCompleted((prev) => !prev);
  };
  // expandedがtrueに変更されたときにアニメーション
  useEffect(() => {
    if (!expanded) return;
    dispatch(actions.todo.toggle(item));
    LayoutAnimation.configureNext(
      { ...LayoutAnimation.Presets.easeInEaseOut, duration: 300 },
      () => {
        setExpanded(false);
      },
    );
  }, [expanded]);

  return (
    <ScaleDecorator activeScale={0.95}>
      <View
        style={[
          styles.item,
          isActive && styles.active,
          {
            borderColor: Colors[colorScheme ?? "light"].placeholderText,
            // borderを重ねるための対応
            marginTop: getIndex() === 0 ? 0 : -1,
          },
        ]}
      >
        <View style={styles.checkWrapper}>
          <Pressable
            style={styles.checkbox}
            disabled={isActive || expanded}
            onPress={handleToggleCheck}
          >
            {completed ? (
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
            disabled={isActive || expanded}
            style={styles.title}
          >
            <Text>{item.title}</Text>
          </Pressable>
        </View>
        {/* 完了済みの場合はソートボタンは非表示 */}
        {item.completed ? (
          <View style={styles.dragButton}></View>
        ) : (
          <Pressable onTouchStart={drag} disabled={isActive || expanded} style={styles.dragButton}>
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
}

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
  active: {
    opacity: 0.9,
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
