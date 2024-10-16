import { customFetch } from "../../utils/apiUtils";

export const fetchBookTags = async () => {
  return await customFetch(`/book-tags`);
};

export const fetchBookTag = async (bookTagId) => {
  return await customFetch(`/book-tags/${bookTagId}`);
};

export const createBookTag = async (bookTag) => {
  return await customFetch(`/book-tags`, {
    method: "POST",
    body: JSON.stringify(bookTag),
  });
};

export const editBookTag = async (bookTag) => {
  return await customFetch(`/book-tags/${bookTag.id}`, {
    method: "PUT",
    body: JSON.stringify(bookTag),
  });
};

export const deleteBookTag = async (bookTagId) => {
  await customFetch(`/book-tags/${bookTagId}`, {
    method: "DELETE",
  });
};
