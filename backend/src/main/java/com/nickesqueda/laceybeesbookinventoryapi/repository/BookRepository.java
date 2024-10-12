package com.nickesqueda.laceybeesbookinventoryapi.repository;

import static com.nickesqueda.laceybeesbookinventoryapi.util.SqlQueries.*;

import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import java.util.List;
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

  @Query(value = SEARCH_BOOKS_USING_TAG_FILTER, nativeQuery = true)
  Page<Book> searchBooksUsingTagFilter(
      @Param("searchTerm") String searchTerm,
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      @Param("bookTagIds") List<Integer> bookTagIds,
      @Param("bookTagCount") Integer bookTagCount,
      Pageable pageable);

  @Query(value = FIND_BOOKS, nativeQuery = true)
  Page<Book> findBooks(
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      Pageable pageable);

  @Query(value = FIND_BOOKS_USING_TAG_FILTER, nativeQuery = true)
  Page<Book> findBooksUsingTagFilter(
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      @Param("bookTagIds") List<Integer> bookTagIds,
      @Param("bookTagCount") Integer bookTagCount,
      Pageable pageable);

  int countByBookCategoryId(int bookCategoryId);

  int countByBookCategoryIdAndReadStatus(int bookCategoryId, ReadStatus readStatus);

  int countByBookTags_Id(int bookTagId);

  int countByReadStatusAndBookTags_Id(ReadStatus readStatus, int bookTagId);

  @Query(value = COUNT_DISTINCT_AUTHORS_IN_BOOK_CATEGORY, nativeQuery = true)
  int countAuthorsInBookCategory(@Param("bookCategoryId") int bookCategoryId);

  @Query(value = COUNT_DISTINCT_AUTHORS_IN_BOOK_TAG, nativeQuery = true)
  int countAuthorsInBookTag(@Param("bookTagId") int bookTagId);

  default Book retrieveOrElseThrow(int bookId) {
    return this.findById(bookId)
        .orElseThrow(() -> new ResourceNotFoundException(Book.class, bookId));
  }
}
