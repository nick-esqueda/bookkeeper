package com.nickesqueda.laceybeesbookinventoryapi.service;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import java.util.List;

public interface BooksService {
  List<BookResponseDto> getBooks();

  BookResponseDto createBook(BookRequestDto bookRequestDto);

  BookResponseDto getBook();

  BookResponseDto editBook();

  void deleteBook();
}
