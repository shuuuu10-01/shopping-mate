import { EntityState } from "@reduxjs/toolkit";

export type Todo = {
  id: string;
  categoryId: string;
  title: string;
  order: number;
  completed: boolean;
  createdAt: string;
};

export type SerializedTodo = EntityState<Todo, string>;
