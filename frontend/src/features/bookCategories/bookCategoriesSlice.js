import { createSlice } from "@reduxjs/toolkit";
import { createBookCategory, fetchBookCategories, fetchBookCategory } from "./bookCategoriesApi";

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
    },
    addBookCategory: (state, action) => {
      const bookCategory = action.payload;
      if (!state.entities[bookCategory.id]) {
        state.ids.push(bookCategory.id);
      }
      state.entities[bookCategory.id] = bookCategory;
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
    const bookCategories = await fetchBookCategories();
    dispatch(setBookCategories(bookCategories));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBookCategoryAsync = (bookCategoryId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const bookCategory = await fetchBookCategory(bookCategoryId);
    dispatch(addBookCategory(bookCategory));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createBookCategoryAsync = (bookCategory) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const category = await createBookCategory(bookCategory);
    dispatch(addBookCategory(category));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }

}
export default bookCategoriesSlice.reducer;
