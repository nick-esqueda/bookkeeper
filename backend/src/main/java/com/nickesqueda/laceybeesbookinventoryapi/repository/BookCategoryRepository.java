package com.nickesqueda.laceybeesbookinventoryapi.repository;

import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer> {
  default BookCategory retrieveOrElseThrow(int bookCategoryId) {
    return this.findById(bookCategoryId)
        .orElseThrow(() -> new ResourceNotFoundException(BookCategory.class, bookCategoryId));
  }
}
