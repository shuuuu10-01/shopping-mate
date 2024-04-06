import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
import { Todo } from "@/types/todo";
import { useCallback } from "react";

/**
 * todoの完了済みフラグを切り替える
 *
 * 完了済み→未完了：同カテゴリーの一番下に来るように並び順を更新
 * 未完了→完了済み：同カテゴリーの並び順を更新し、完了済みフラグを切り替える
 */
export default function useToggleTodo(originTodo: Todo) {
  const dispatch = useAppDispatch();
  const sortedTodo = useAppSelector((state) =>
    selectors.todo.sortedTodoByCategoryId(state.todo, originTodo.categoryId),
  );
  return useCallback(() => {
    if (originTodo.completed) {
      // Todoを同カテゴリーの一番下に来るように並び順を更新
      // Todoを未完了に更新
      dispatch(
        actions.todo.edit({
          ...originTodo,
          order: sortedTodo.length ? sortedTodo[sortedTodo.length - 1].order + 1 : 0,
          completed: false,
        }),
      );
    } else {
      // Todoの並び順を更新
      dispatch(actions.todo.removeOrder(originTodo));
      // Todoを完了済みに更新
      dispatch(actions.todo.edit({ ...originTodo, completed: true }));
    }
  }, [dispatch, actions, sortedTodo]);
}
