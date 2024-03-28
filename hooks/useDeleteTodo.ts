import { actions, selectors, useAppDispatch, useAppSelector } from "@/redux";
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
  const sortedTodo = useAppSelector((state) =>
    selectors.todo.sortedTodoByCategoryId(state.todo, todo.categoryId),
  );
  const filteredTodo = sortedTodo.filter((s) => s.id !== todo.id);

  return useCallback(() => {
    // Todoの並び順を更新
    dispatch(
      actions.todo.setMany(
        filteredTodo.map((t, index) => ({
          ...t,
          order: index,
        })),
      ),
    );
    // Todoを削除
    dispatch(actions.todo.delete(todo.id));
  }, [actions, filteredTodo, todo]);
}
