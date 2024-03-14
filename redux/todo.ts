import { SerializedTodo, Todo } from "@/types/todo";
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type State = {
  todo: SerializedTodo;
};

const todoAdapter = createEntityAdapter({
  selectId: (todo: Todo) => todo.id,
});

const todoSelectors = todoAdapter.getSelectors();

const sortedTodoByCategoryId = createSelector(
  (state: State) => todoSelectors.selectAll(state.todo),
  (_state: State, categoryId: Todo["categoryId"]) => categoryId,
  (state, categoryId) => {
    const filtered = state.filter((s) => s.categoryId === categoryId);
    return filtered.sort((a, b) => (a.order > b.order ? 1 : -1));
  },
);

const completedTodo = createSelector(
  (state: State) => todoSelectors.selectAll(state.todo),
  (state) => {
    return state.filter((s) => s.completed);
  },
);

export const selectors = {
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
    toggle(state, action: PayloadAction<Todo>) {
      todoAdapter.setOne(state.todo, { ...action.payload, completed: !action.payload.completed });
    },
  },
});
