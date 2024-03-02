import { EntityState } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type SerializedTodo = EntityState<Todo, string>;
