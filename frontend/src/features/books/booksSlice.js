import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBooks,
  fetchBook,
  createBook,
  deleteBook,
  editBook,
} from "./booksApi";

const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
  nextPageNum: 0,
  hasNextPage: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.entities = {};
      state.ids = [];
      action.payload.forEach((book) => {
        state.entities[book.id] = book;
        state.ids.push(book.id);
      });
    },
    addBooks: (state, action) => {
      action.payload.forEach((book) => {
        if (!state.entities[book.id]) {
          state.entities[book.id] = book;
          state.ids.push(book.id);
        }
      });
    },
    addBook: (state, action) => {
      const book = action.payload;
      if (!state.entities[book.id]) {
        state.entities[book.id] = book;
        state.ids.push(book.id);
      }
    },
    updateBook: (state, action) => {
      const book = action.payload;
      if (state.entities[book.id]) {
        state.entities[book.id] = book;
      }
    },
    removeBook: (state, action) => {
      const id = action.payload;
      delete state.entities[id];
      state.ids = state.ids.filter((bookId) => bookId !== id);
    },
    setHasNextPage: (state, action) => {
      state.hasNextPage = action.payload;
    },
    setNextPageNum: (state, action) => {
      state.nextPageNum = action.payload;
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
  setBooks,
  addBooks,
  addBook,
  updateBook,
  removeBook,
  setHasNextPage,
  setNextPageNum,
  setLoading,
  setError,
} = booksSlice.actions;

export const fetchBooksAsync = (queryParams) => async (dispatch) => {
  dispatch(setLoading(true));
  const params = new URLSearchParams(queryParams);
  params.set("pageNum", 0);
  params.set("pageSize", 12);

  try {
    const response = await fetchBooks(params);
    dispatch(setBooks(response.content));
    dispatch(setHasNextPage(!response.last));
    dispatch(setNextPageNum(1));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBooksNextPageAsync = (queryParams) => async (dispatch) => {
  dispatch(setLoading(true));
  const params = new URLSearchParams(queryParams);
  params.set("pageSize", 12);

  try {
    const response = await fetchBooks(params);
    dispatch(addBooks(response.content));
    dispatch(setHasNextPage(!response.last));
    dispatch(setNextPageNum(response.number + 1));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBookAsync = (bookId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const book = await fetchBook(bookId);
    dispatch(addBook(book));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createBookAsync = (book) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const createdBook = await createBook(book);
    dispatch(addBook(createdBook));
    return createdBook;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const editBookAsync = (book) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const editedBook = await editBook(book);
    dispatch(updateBook(editedBook));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteBookAsync = (bookId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteBook(bookId);
    dispatch(removeBook(bookId));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default booksSlice.reducer;
