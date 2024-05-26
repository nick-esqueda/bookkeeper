import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./booksApi";

const initialState = {
  entities: [],
  ids: [],
  loading: false,
  error: null
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks: (state, action) => {
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

export const { setBooks, setLoading, setError } = booksSlice.actions;

export const fetchBooksAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const books = await fetchBooks();
    dispatch(setBooks(books));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default booksSlice.reducer;
