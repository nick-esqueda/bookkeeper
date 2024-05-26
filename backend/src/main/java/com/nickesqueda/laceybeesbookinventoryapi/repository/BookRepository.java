package com.nickesqueda.laceybeesbookinventoryapi.repository;

import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.exception.ResourceNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
  default Book retrieveOrElseThrow(int bookId) {
    return this.findById(bookId)
        .orElseThrow(() -> new ResourceNotFoundException(Book.class, bookId));
  }
}
