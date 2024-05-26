import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooksAsync } from '../features/books/booksSlice';

const BooksPage = () => {
  // show and find books in the inventory.
  // MVP: list all books, search through books, filter by category & read status
  // GOAL: searching, sorting, filtering, pagination, page sizes
  
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.entities);
  const loading = useSelector((state) => state.bookCategories.loading);
  const error = useSelector((state) => state.bookCategories.error);
  
  useEffect(() => {
    dispatch(fetchBooksAsync());
  }, [dispatch]);
  

  if (loading) {
    return <p>Loading...</p>;
  }
  
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <div>
              <div>{book.title}</div>
              <div>{book.author}</div>
              <div>{book.readStatus}</div>
              <div>{book.bookCategory.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BooksPage;
