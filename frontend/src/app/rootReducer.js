import { combineReducers } from "@reduxjs/toolkit";
import bookCategoriesReducer from '../features/bookCategories/bookCategoriesSlice';
import booksReducer from '../features/books/booksSlice';

const rootReducer = combineReducers({
  bookCategories: bookCategoriesReducer,
  books: booksReducer
});

export default rootReducer;
