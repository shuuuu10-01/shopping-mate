import { StatusBar } from "expo-status-bar";
import { Platform, Pressable, StyleSheet } from "react-native";

import { Text, TextInput, View } from "@/components/Themed";
import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import ColorPicker from "react-native-color-picker-ios";

const INITIAL_COLOR = "#EB4D3Dff";

export default function CategoryModalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const originCategory = useAppSelector((state) =>
    selectors.category.categorySelectors.selectById(state.category.categories, id),
  );
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [color, setColor] = useState(INITIAL_COLOR);
  const navigate = useNavigation();
  const isEdit = !!id;

  const reset = () => {
    setName("");
    setColor(INITIAL_COLOR);
    navigate.goBack();
  };

  const handleAdd = () => {
    if (name === "") return;
    if (isEdit) {
      dispatch(actions.category.edit({ ...originCategory, name, color }));
    } else {
      dispatch(
        actions.category.add({
          name,
          color,
        }),
      );
    }
    reset();
  };

  const handleDelete = () => {
    dispatch(actions.category.delete(id));
    reset();
  };

  const handlePress = useCallback(() => {
    ColorPicker.showColorPicker({ supportsAlpha: false, initialColor: color }, (color) => {
      setColor(color);
    });
  }, [color]);

  useEffect(() => {
    if (!isEdit) return;
    setName(originCategory.name);
    setColor(originCategory.color);
  }, [id]);

  return (
    <View style={styles.container}>
      <View style={styles.close}></View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> {id ? "カテゴリーの編集" : "カテゴリーの追加"}</Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.titleLabel}>
        <Text>カテゴリー名</Text>
        <TextInput
          style={styles.titleInput}
          value={name}
          onChangeText={setName}
          blurOnSubmit
          enterKeyHint="done"
          placeholder="カテゴリー名を入力してください"
        ></TextInput>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.colorLabel}>
        <Text>カラー</Text>
        <Pressable onPress={handlePress} style={styles.color}>
          <View style={styles.colorView} lightColor={color} darkColor={color}></View>
          <View style={[styles.categoryName, { backgroundColor: "rgba(118,118,128,0.12)" }]}>
            <Text>{color}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Pressable onPress={handleAdd}>
        {({ pressed }) => (
          <View style={styles.addButton}>
            <Text
              style={{
                fontSize: 18,
                opacity: pressed ? 0.5 : 1,
              }}
            >
              {id ? "変更する" : "追加する"}
            </Text>
          </View>
        )}
      </Pressable>
      {isEdit && (
        <Pressable style={styles.delete} onPress={handleDelete}>
          {({ pressed }) => (
            <FontAwesome
              name="trash"
              size={30}
              color="#fff"
              style={{ opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
      )}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  close: {
    width: 36,
    height: 5,
    marginTop: 5,
    marginBottom: 4,
    borderRadius: 2.5,
    backgroundColor: "#3C3C43",
  },
  header: { display: "flex", justifyContent: "center", alignItems: "center", height: 44 },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  colorLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 44,
  },
  color: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  colorView: {
    width: 50,
    height: 30,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  categoryName: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 6,
  },
  titleLabel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    height: 44,
  },
  titleInput: {
    padding: 10,
    margin: 12,
    height: 40,
  },
  addButton: {
    marginTop: 30,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "rgba(118,118,128,0.12)",
  },
  separator: {
    height: 1,
    width: "100%",
  },
  delete: {
    position: "absolute",
    bottom: 35,
    right: 35,
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
