import { EntityState } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  title: string;
  order: number;
  completed: boolean;
};

export type SerializedTodo = EntityState<Todo, string>;
