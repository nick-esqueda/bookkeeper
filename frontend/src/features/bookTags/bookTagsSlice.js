import { createSlice } from "@reduxjs/toolkit";
import {
  createBookTag,
  deleteBookTag,
  editBookTag,
  fetchBookTag,
  fetchBookTags,
} from "./bookTagsApi";

const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
};

const bookTagsSlice = createSlice({
  name: "bookTags",
  initialState,
  reducers: {
    setBookTags: (state, action) => {
      state.entities = {};
      state.ids = [];
      action.payload.forEach((bookTag) => {
        state.entities[bookTag.id] = bookTag;
        state.ids.push(bookTag.id);
      });
    },
    addBookTags: (state, action) => {
      action.payload.forEach((bookTag) => {
        if (!state.entities[bookTag.id]) {
          state.entities[bookTag.id] = bookTag;
          state.ids.push(bookTag.id);
        }
      });
    },
    addBookTag: (state, action) => {
      const bookTag = action.payload;
      if (!state.entities[bookTag.id]) {
        state.entities[bookTag.id] = bookTag;
        state.ids.push(bookTag.id);
      }
    },
    updateBookTag: (state, action) => {
      const bookTag = action.payload;
      if (state.entities[bookTag.id]) {
        state.entities[bookTag.id] = bookTag;
      }
    },
    removeBookTag: (state, action) => {
      const deletedBookTagId = action.payload;
      delete state.entities[deletedBookTagId];
      state.ids = state.ids.filter((id) => id !== deletedBookTagId);
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
  setBookTags,
  addBookTags,
  addBookTag,
  updateBookTag,
  removeBookTag,
  setLoading,
  setError,
} = bookTagsSlice.actions;

export const fetchBookTagsAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await fetchBookTags();
    dispatch(setBookTags(response));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchBookTagAsync = (bookTagId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const bookTag = await fetchBookTag(bookTagId);
    dispatch(addBookTag(bookTag));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const createBookTagAsync = (bookTag) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const createdBookTag = await createBookTag(bookTag);
    dispatch(addBookTag(createdBookTag));
    return createdBookTag;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const editBookTagAsync = (bookTag) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const editedBookTag = await editBookTag(bookTag);
    dispatch(updateBookTag(editedBookTag));
    return editedBookTag;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteBookTagAsync = (bookTagId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteBookTag(bookTagId);
    dispatch(removeBookTag(bookTagId));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default bookTagsSlice.reducer;
