package com.nickesqueda.laceybeesbookinventoryapi.service;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import java.util.List;

public interface BooksService {
  List<BookResponseDto> getBooks();

  BookResponseDto createBook(BookRequestDto bookRequestDto);

  BookResponseDto getBook(int bookId);

  BookResponseDto editBook(int bookId, BookRequestDto bookRequestDto);

  void deleteBook(int bookId);
}
