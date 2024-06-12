package com.nickesqueda.laceybeesbookinventoryapi.repository;

import static com.nickesqueda.laceybeesbookinventoryapi.util.SqlQueries.*;

import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import com.nickesqueda.laceybeesbookinventoryapi.model.BookCategoryWithStats;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer> {
  boolean existsByName(String name);

  @Query(value = FIND_BOOK_CATEGORY_WITH_STATS, nativeQuery = true)
  Optional<BookCategoryWithStats> findBookCategoryWithStats(
      @Param("bookCategoryId") int bookCategoryId);

  default BookCategory retrieveOrElseThrow(int bookCategoryId) {
    return this.findById(bookCategoryId)
        .orElseThrow(() -> new ResourceNotFoundException(BookCategory.class, bookCategoryId));
  }

  default BookCategoryWithStats retrieveWithStatsOrElseThrow(int bookCategoryId) {
    return this.findBookCategoryWithStats(bookCategoryId)
        .orElseThrow(() -> new ResourceNotFoundException(BookCategory.class, bookCategoryId));
  }
}
