import { createSlice } from "@reduxjs/toolkit";
import { fetchBookCategories } from "./bookCategoriesApi";

const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
};

const bookCategoriesSlice = createSlice({
  name: "bookCategories",
  initialState,
  reducers: {
    setBookCategories: (state, action) => {
      state.entities = {};
      state.ids = [];
      action.payload.forEach((bookCategory) => {
        state.entities[bookCategory.id] = bookCategory;
        state.ids.push(bookCategory.id);
      });
      state.loading = false;
      state.error = null;
    },
    addBookCategory: (state, action) => {
      const bookCategory = action.payload;
      state.entities[bookCategory.id] = bookCategory;
      state.ids.push(bookCategory.id);
    },
    updateBookCategory: (state, action) => {
      const bookCategory = action.payload;
      if (state.entities[bookCategory.id]) {
        state.entities[bookCategory.id] = bookCategory;
      }
    },
    removeBookCategory: (state, action) => {
      const id = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter((bookCategoryId) => bookCategoryId !== id);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setBookCategories,
  addBookCategory,
  updateBookCategory,
  removeBookCategory,
  setLoading,
  setError,
} = bookCategoriesSlice.actions;

export const fetchBookCategoriesAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const books = await fetchBookCategories();
    dispatch(setBookCategories(books));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default bookCategoriesSlice.reducer;
