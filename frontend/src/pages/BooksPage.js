import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooksAsync } from '../features/books/booksSlice';

const BooksPage = () => {
  // show and find books in the inventory.
  // MVP: list all books, search through books, filter by category & read status
  // GOAL: searching, sorting, filtering, pagination, page sizes
  
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.entities);
  const bookIds = useSelector((state) => state.books.ids);
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
        {bookIds.map((id) => (
          <li key={id}>
            <div>
              <div>{books[id].title}</div>
              <div>{books[id].author}</div>
              <div>{books[id].readStatus}</div>
              <div>{books[id].bookCategory.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BooksPage;
