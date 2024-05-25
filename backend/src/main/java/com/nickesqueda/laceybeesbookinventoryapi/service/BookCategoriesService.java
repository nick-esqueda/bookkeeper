package com.nickesqueda.laceybeesbookinventoryapi.service;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryResponseDto;
import java.util.List;

public interface BookCategoriesService {
  List<BookCategoryResponseDto> getBookCategories();

  BookCategoryResponseDto createBookCategory(BookCategoryRequestDto bookCategoryRequestDto);

  BookCategoryResponseDto getBookCategory(int bookCategoryId);

  BookCategoryResponseDto editBookCategory(int bookCategoryId, BookCategoryRequestDto bookCategoryRequestDto);

  void deleteBookCategory(int bookCategoryId);
}
