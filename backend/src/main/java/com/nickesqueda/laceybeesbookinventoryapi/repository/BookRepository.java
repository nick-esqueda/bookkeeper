package com.nickesqueda.laceybeesbookinventoryapi.repository;

import static com.nickesqueda.laceybeesbookinventoryapi.util.SqlQueries.*;

import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, Integer> {

  @Query(value = SEARCH_BOOKS, nativeQuery = true)
  Page<Book> searchBooks(
      @Param("searchTerm") String searchTerm,
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      Pageable pageable);

  @Query(value = FIND_BOOKS, nativeQuery = true)
  Page<Book> findBooks(
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      Pageable pageable);

  int countByBookCategoryId(int bookCategoryId);

  int countByBookCategoryIdAndReadStatus(int bookCategoryId, ReadStatus readStatus);

  @Query(value = COUNT_DISTINCT_AUTHORS_IN_BOOK_CATEGORY, nativeQuery = true)
  int countAuthorsInBookCategory(@Param("bookCategoryId") int bookCategoryId);

  default Book retrieveOrElseThrow(int bookId) {
    return this.findById(bookId)
        .orElseThrow(() -> new ResourceNotFoundException(Book.class, bookId));
  }
}
