package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BooksService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BooksServiceImpl implements BooksService {
  @Override
  public List<BookResponseDto> getBooks() {
    return List.of();
  }

  @Override
  public BookResponseDto createBook() {
    return null;
  }

  @Override
  public BookResponseDto getBook() {
    return null;
  }

  @Override
  public BookResponseDto editBook() {
    return null;
  }

  @Override
  public void deleteBook() {}
}
