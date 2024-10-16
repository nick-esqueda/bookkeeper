import { customFetch } from "../../utils/apiUtils";

export const fetchBookCategories = async () => {
  return await customFetch(`/book-categories`);
};

export const fetchBookCategory = async (bookCategoryId) => {
  return await customFetch(`/book-categories/${bookCategoryId}`);
};

export const createBookCategory = async (bookCategory) => {
  return await customFetch(`/book-categories`, {
    method: "POST",
    body: JSON.stringify(bookCategory),
  });
};

export const editBookCategory = async (bookCategory) => {
  return await customFetch(`/book-categories/${bookCategory.id}`, {
    method: "PUT",
    body: JSON.stringify(bookCategory),
  });
};
