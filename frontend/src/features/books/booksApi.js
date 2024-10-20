import { customFetch } from "../../utils/apiUtils";

export const fetchBooks = async (queryParams) => {
  return await customFetch(`/books?${queryParams.toString()}`);
};

export const fetchBook = async (bookId) => {
  return await customFetch(`/books/${bookId}`);
};

export const createBook = async (book) => {
  return await customFetch(`/books`, {
    method: "POST",
    body: JSON.stringify(book),
  });
};

export const editBook = async (book) => {
  return await customFetch(`/books/${book.id}`, {
    method: "PUT",
    body: JSON.stringify(book),
  });
};

export const deleteBook = async (bookId) => {
  await customFetch(`/books/${bookId}`, {
    method: "DELETE",
  });
};
