package com.nickesqueda.laceybeesbookinventoryapi.service;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import java.util.List;

public interface BooksService {
  List<BookResponseDto> getBooks();

  BookResponseDto createBook();

  BookResponseDto getBook();

  BookResponseDto editBook();

  void deleteBook();
}
