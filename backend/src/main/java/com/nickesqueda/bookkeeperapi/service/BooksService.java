package com.nickesqueda.bookkeeperapi.service;

import com.nickesqueda.bookkeeperapi.dto.BookRequestDto;
import com.nickesqueda.bookkeeperapi.dto.BookResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface BooksService {
  Page<BookResponseDto> getBooks(
      String readStatus, Integer bookCategoryId, List<Integer> bookTagIds, PageRequest pageRequest);

  Page<BookResponseDto> searchBooks(
      String query,
      String readStatus,
      Integer bookCategoryId,
      List<Integer> bookTagIds,
      PageRequest pageRequest);

  BookResponseDto createBook(BookRequestDto bookRequestDto);

  BookResponseDto getBook(int bookId);

  BookResponseDto editBook(int bookId, BookRequestDto bookRequestDto);

  void deleteBook(int bookId);
}
