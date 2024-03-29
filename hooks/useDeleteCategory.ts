import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Category } from "@/types/category";
import { useCallback } from "react";

/**
 * reduxのカテゴリーを削除するための関数
 *
 * @param id カテゴリーID
 */
export default function useDeleteCategory(id: Category["id"]) {
  const dispatch = useAppDispatch();
  const todo = useAppSelector((state) => selectors.todo.sortedTodoByCategoryId(state.todo, id));
  const nonCategoryTodo = useAppSelector((state) =>
    selectors.todo.sortedTodoByCategoryId(state.todo, ""),
  );

  return useCallback(() => {
    const length = nonCategoryTodo.length;
    // 削除するカテゴリーに紐づいているtodoをカテゴリー未設定に変更
    dispatch(
      actions.todo.setMany(
        todo.map((t, index) => ({
          ...t,
          categoryId: "",
          order: length + index + 1,
        })),
      ),
    );
    // カテゴリーを削除
    dispatch(actions.category.delete(id));
  }, [nonCategoryTodo, todo, id]);
}
