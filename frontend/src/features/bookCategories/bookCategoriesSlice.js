import { createSlice } from "@reduxjs/toolkit";
import { fetchBookCategories } from "./bookCategoriesApi";

const initialState = {
  entities: [],
  ids: [],
  loading: false,
  error: null
};

const bookCategoriesSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBookCategories: (state, action) => {
      state.entities = action.payload;
      state.ids = action.payload.map(bookCategory => bookCategory.id);
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const { setBookCategories, setLoading, setError } = bookCategoriesSlice.actions;

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
