import { EntityState } from "@reduxjs/toolkit";

export type Category = {
  id: string;
  name: string;
  order: number;
  color: string;
};

export type SerializedCategory = EntityState<Category, string>;
