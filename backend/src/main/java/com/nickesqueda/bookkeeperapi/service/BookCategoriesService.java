package com.nickesqueda.bookkeeperapi.service;

import com.nickesqueda.bookkeeperapi.dto.BookCategoryRequestDto;
import com.nickesqueda.bookkeeperapi.dto.BookCategoryResponseDto;
import java.util.List;

public interface BookCategoriesService {
  List<BookCategoryResponseDto> getBookCategories();

  BookCategoryResponseDto createBookCategory(BookCategoryRequestDto bookCategoryRequestDto);

  BookCategoryResponseDto getBookCategory(int bookCategoryId);

  BookCategoryResponseDto editBookCategory(int bookCategoryId, BookCategoryRequestDto bookCategoryRequestDto);

  void deleteBookCategory(int bookCategoryId);
}
