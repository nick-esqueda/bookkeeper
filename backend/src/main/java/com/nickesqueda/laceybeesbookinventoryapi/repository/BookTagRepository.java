package com.nickesqueda.laceybeesbookinventoryapi.repository;

import static com.nickesqueda.laceybeesbookinventoryapi.util.SqlQueries.FIND_ALL_BOOK_TAGS_WITH_STATS;
import static com.nickesqueda.laceybeesbookinventoryapi.util.SqlQueries.FIND_BOOK_TAG_WITH_STATS;

import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookTag;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import com.nickesqueda.laceybeesbookinventoryapi.model.BookTagWithStats;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookTagRepository extends JpaRepository<BookTag, Integer> {
  boolean existsByName(String name);

  @Query(value = FIND_ALL_BOOK_TAGS_WITH_STATS, nativeQuery = true)
  List<BookTagWithStats> findAllWithStats();

  @Query(value = FIND_BOOK_TAG_WITH_STATS, nativeQuery = true)
  Optional<BookTagWithStats> findByIdWithStats(@Param("bookTagId") int bookTagId);

  default BookTag retrieveOrElseThrow(int bookTagId) {
    return this.findById(bookTagId)
        .orElseThrow(() -> new ResourceNotFoundException(BookTag.class, bookTagId));
  }

  default BookTagWithStats retrieveWithStatsOrElseThrow(int bookTagId) {
    return this.findByIdWithStats(bookTagId)
        .orElseThrow(() -> new ResourceNotFoundException(BookTag.class, bookTagId));
  }
}
