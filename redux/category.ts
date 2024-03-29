import { CATEGORIES } from "@/constants/category";
import { Category, SerializedCategory } from "@/types/category";
import { PayloadAction, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";

import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

type State = {
  categories: SerializedCategory;
};

const categoryAdapter = createEntityAdapter({
  selectId: (category: Category) => category.id,
});

const categorySelectors = categoryAdapter.getSelectors();

const sortedCategories = createSelector(
  (state: State) => categorySelectors.selectAll(state.categories),
  (state) => {
    return state.sort((a, b) => (a.order > b.order ? 1 : -1));
  },
);

export const selectors = {
  categorySelectors,
  sortedCategories,
};

export const { actions, reducer } = createSlice({
  name: "category",
  initialState: {
    categories: categoryAdapter.getInitialState({}, CATEGORIES),
  } as State,
  reducers: {
    add(state, action: PayloadAction<Omit<Category, "id" | "order">>) {
      categoryAdapter.addOne(state.categories, {
        ...action.payload,
        id: uuidv4(),
        order: state.categories.ids.length,
      });
    },
    setMany(state, action: PayloadAction<Category[]>) {
      categoryAdapter.setMany(state.categories, action.payload);
    },
    edit(state, action: PayloadAction<Category>) {
      categoryAdapter.setOne(state.categories, action.payload);
    },
    delete(state, action: PayloadAction<Category["id"]>) {
      categoryAdapter.removeOne(state.categories, action.payload);
    },
  },
});
