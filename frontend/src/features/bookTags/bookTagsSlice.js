import { createSlice } from "@reduxjs/toolkit";
import { createBookTag, fetchBookTag, fetchBookTags } from "./bookTagsApi";

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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setBookTags, addBookTags, addBookTag, setLoading, setError } =
  bookTagsSlice.actions;

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

export default bookTagsSlice.reducer;
