import { Category, SerializedCategory } from "@/types/category";
import { SerializedTodo, Todo } from "@/types/todo";
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { selectors as categorySelectors } from "./category";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type State = {
  todo: SerializedTodo;
};

const todoAdapter = createEntityAdapter({
  selectId: (todo: Todo) => todo.id,
});

type TodoHasCategory = Todo & {
  category?: Category;
};

const todoSelectors = todoAdapter.getSelectors();

const sortedTodoByCategoryId = createSelector(
  (state: State) => todoSelectors.selectAll(state.todo),
  (_state: State, categoryId: Todo["categoryId"]) => categoryId,
  (state, categoryId) => {
    const filtered = state.filter((s) => !s.completed && s.categoryId === categoryId);
    return filtered.sort((a, b) => (a.order > b.order ? 1 : -1));
  },
);

/**
 * 完了済みTodoを取得する
 *
 * カテゴリーのソート順に合わせてソートを行う。
 * カテゴリー未選択のタスクは後ろに配置。
 * 同じカテゴリーのTodoは作成日時の昇順でソートする
 */
const completedTodo = createSelector(
  (state: State) => todoSelectors.selectAll(state.todo),
  (_: State, state: SerializedCategory) => categorySelectors.categorySelectors.selectAll(state),
  (state, categoryState) => {
    const filter = state.filter((s) => s.completed);
    const todoHasCategory = filter.map((f) => {
      const category = categoryState.find((c) => f.categoryId === c.id);
      return { ...f, category: category };
    });
    const sort = todoHasCategory.sort((a, b) => {
      if (a.category === undefined && b.category === undefined) {
        const dateA = new Date(a.createdAt).getTime(),
          dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      }

      // 片方のorderのみundefinedの場合は後ろに配置
      if (a.category === undefined) return 1;
      if (b.category === undefined) return -1;

      // orderで比較
      if (a.category.order < b.category.order) return -1;
      if (a.category.order > b.category.order) return 1;

      // orderが同じ場合は、createdAtで比較
      const dateA = new Date(a.createdAt).getTime(),
        dateB = new Date(b.createdAt).getTime();
      return dateA - dateB;
    });
    return sort;
  },
);

export const selectors = {
  todoSelectors,
  sortedTodoByCategoryId,
  completedTodo,
};

export const { actions, reducer } = createSlice({
  name: "todo",
  initialState: {
    todo: todoAdapter.getInitialState(),
  } as State,
  reducers: {
    add(state, action: PayloadAction<Omit<Todo, "id" | "order">>) {
      todoAdapter.addOne(state.todo, {
        ...action.payload,
        id: uuidv4(),
        order: state.todo.ids.length,
      });
    },
    setMany(state, action: PayloadAction<Todo[]>) {
      todoAdapter.setMany(state.todo, action.payload);
    },
    edit(state, action: PayloadAction<Todo>) {
      todoAdapter.setOne(state.todo, action.payload);
    },
    delete(state, action: PayloadAction<Todo["id"]>) {
      todoAdapter.removeOne(state.todo, action.payload);
    },
    /**
     * 受け取ったTodoを除いた並び順に更新する
     */
    removeOrder(state, { payload }: PayloadAction<Todo>) {
      const sortedTodo = selectors.sortedTodoByCategoryId(state, payload.categoryId);
      const filter = sortedTodo.filter((s) => s.id !== payload.id);
      todoAdapter.setMany(
        state.todo,
        filter.map((f, index) => ({ ...f, order: index })),
      );
    },
  },
});
