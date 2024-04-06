import { actions, useAppDispatch } from "@/redux";
import { Todo } from "@/types/todo";
import { useCallback } from "react";

/**
 * reduxのtodoを削除するための関数
 *
 * @param todo
 */
export default function useDeleteTodo(todo?: Todo) {
  if (!todo) return;
  const dispatch = useAppDispatch();

  return useCallback(() => {
    // Todoの並び順を更新
    dispatch(actions.todo.removeOrder(todo));
    // Todoを削除
    dispatch(actions.todo.delete(todo.id));
  }, [dispatch, actions, todo]);
}
