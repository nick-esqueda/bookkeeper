package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import com.nickesqueda.laceybeesbookinventoryapi.service.BookCategoriesService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookCategoriesServiceImpl implements BookCategoriesService {
  private final BookCategoryRepository bookCategoryRepository;
  private final ModelMapper modelMapper;

  @Override
  public List<BookCategoryResponseDto> getBookCategories() {
    List<BookCategory> bookCategories = bookCategoryRepository.findAll();
    return bookCategories.stream()
        .map(bookCategory -> modelMapper.map(bookCategory, BookCategoryResponseDto.class))
        .toList();
  }

  @Override
  public BookCategoryResponseDto createBookCategory(BookCategoryRequestDto bookCategoryRequestDto) {
    BookCategory bookCategoryEntity = modelMapper.map(bookCategoryRequestDto, BookCategory.class);
    bookCategoryEntity = bookCategoryRepository.save(bookCategoryEntity);
    return modelMapper.map(bookCategoryEntity, BookCategoryResponseDto.class);
  }

  @Override
  public BookCategoryResponseDto getBookCategory(int bookCategoryId) {
    BookCategory bookCategoryEntity = bookCategoryRepository.retrieveOrElseThrow(bookCategoryId);
    return modelMapper.map(bookCategoryEntity, BookCategoryResponseDto.class);
  }
}
