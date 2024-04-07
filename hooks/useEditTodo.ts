import { RootState, actions, selectors, store, useAppDispatch } from "@/redux";
import { Todo } from "@/types/todo";
import { useCallback } from "react";

/**
 * reduxのtodoを編集する
 *
 * カテゴリーを変更しない場合：タイトル名のみ変更
 * カテゴリーを変更 かつ 完了済み場合：タイトルとカテゴリーIDを変更
 * カテゴリーを変更 かつ 未完了場合：タイトル名とカテゴリーIDを変更。元のカテゴリーの並び順を更新し、新しいカテゴリーの並び順最後になるように設定する
 *
 * @param todo
 */
export default function useEditTodo(originTodo?: Todo) {
  if (!originTodo) return;
  const dispatch = useAppDispatch();

  return useCallback(
    (title: string, categoryId: string) => {
      // カテゴリーを変更しない場合：タイトルのみ変更
      if (originTodo.categoryId === categoryId) {
        dispatch(actions.todo.edit({ ...originTodo, title }));
        return;
      }
      // カテゴリーを変更 かつ 完了済み場合：タイトルとカテゴリーIDを変更
      if (originTodo.completed) {
        dispatch(actions.todo.edit({ ...originTodo, title, categoryId }));
      }
      // カテゴリーを変更 かつ 未完了場合：タイトルとカテゴリーIDを変更。元のカテゴリーの並び順を更新し、新しいカテゴリーの並び順最後になるように設定する
      const state = store.getState() as RootState;
      // 元のカテゴリーの並び順を更新
      dispatch(actions.todo.removeOrder(originTodo));
      const newSortedTodo = selectors.todo.sortedTodoByCategoryId(state.todo, categoryId);
      // タスクの編集
      // 新しいカテゴリーの並び順最後になるようにを設定する
      dispatch(
        actions.todo.edit({
          ...originTodo,
          title,
          categoryId,
          order: newSortedTodo.length ? newSortedTodo[newSortedTodo.length - 1].order + 1 : 0,
        }),
      );
    },
    [dispatch, actions, store, originTodo],
  );
}
