import { Todo } from "@/types/todo";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

const sampleSelector = createSelector(
  (state: Todo[]) => state,
  (state) => {
    return state;
  },
);

export const selectors = {
  sampleSelector,
};

export const { actions, reducer } = createSlice({
  name: "todo",
  initialState: {
    todo: [] as Todo[],
  },
  reducers: {
    pushTodo(state, action: PayloadAction<Todo>) {
      state.todo.push(action.payload);
    },
  },
});
