package com.nickesqueda.laceybeesbookinventoryapi.service;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface BooksService {
  Page<BookResponseDto> getBooks(
      String readStatus, Integer bookCategoryId, PageRequest pageRequest);

  Page<BookResponseDto> searchBooks(
      String query, String readStatus, Integer bookCategoryId, PageRequest pageRequest);

  BookResponseDto createBook(BookRequestDto bookRequestDto);

  BookResponseDto getBook(int bookId);

  BookResponseDto editBook(int bookId, BookRequestDto bookRequestDto);

  void deleteBook(int bookId);
}
