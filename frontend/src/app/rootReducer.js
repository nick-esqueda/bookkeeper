import { combineReducers } from "@reduxjs/toolkit";
import bookCategoriesReducer from '../features/bookCategories/bookCategoriesSlice';

const rootReducer = combineReducers({
  bookCategories: bookCategoriesReducer,
});

export default rootReducer;
