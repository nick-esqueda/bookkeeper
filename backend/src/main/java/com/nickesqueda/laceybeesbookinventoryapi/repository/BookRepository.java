package com.nickesqueda.laceybeesbookinventoryapi.repository;

import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookRepository extends JpaRepository<Book, Integer> {
  // use CONCAT(:searchTerm, '*')) for prefix matching.
  // note: "IN BOOLEAN MODE" ignores some common words (a.k.a. stopwords)
  @Query(
      value =
          "SELECT * FROM books WHERE "
              + "MATCH(title, author, edition, notes) AGAINST (CONCAT(:searchTerm, '*') IN BOOLEAN MODE) "
              + "AND (:readStatus IS NULL OR read_status = :readStatus) "
              + "AND (:bookCategoryId IS NULL OR book_category_id = :bookCategoryId)",
      nativeQuery = true)
  Page<Book> searchBooks(
      @Param("searchTerm") String searchTerm,
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      Pageable pageable);

  @Query(
      value =
          "SELECT * FROM books WHERE "
              + "(:readStatus IS NULL OR read_status = :readStatus) "
              + "AND (:bookCategoryId IS NULL OR book_category_id = :bookCategoryId)",
      nativeQuery = true)
  Page<Book> findBooks(
      @Param("readStatus") String readStatus,
      @Param("bookCategoryId") Integer bookCategoryId,
      Pageable pageable);

  default Book retrieveOrElseThrow(int bookId) {
    return this.findById(bookId)
        .orElseThrow(() -> new ResourceNotFoundException(Book.class, bookId));
  }
}
