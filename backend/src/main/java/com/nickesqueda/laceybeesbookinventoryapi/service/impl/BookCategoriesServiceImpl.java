package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.exception.UniqueConstraintViolationException;
import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookRepository;
import com.nickesqueda.laceybeesbookinventoryapi.service.BookCategoriesService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookCategoriesServiceImpl implements BookCategoriesService {
  private final BookCategoryRepository bookCategoryRepository;
  private final BookRepository bookRepository;
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
    String bookCategoryName = bookCategoryRequestDto.getName();
    if (bookCategoryRepository.existsByName(bookCategoryName)) {
      throw new UniqueConstraintViolationException(BookCategory.class, "name", bookCategoryName);
    }

    BookCategory bookCategoryEntity = modelMapper.map(bookCategoryRequestDto, BookCategory.class);
    bookCategoryEntity = bookCategoryRepository.save(bookCategoryEntity);
    return modelMapper.map(bookCategoryEntity, BookCategoryResponseDto.class);
  }

  @Override
  public BookCategoryResponseDto getBookCategory(int bookCategoryId) {
    BookCategory bookCategoryEntity = bookCategoryRepository.retrieveOrElseThrow(bookCategoryId);
    int totalBookCount = bookRepository.countByBookCategoryId(bookCategoryId);
    int readBookCount = bookRepository.countByBookCategoryIdAndReadStatus(bookCategoryId, ReadStatus.READ);

    BookCategoryResponseDto bookCategoryDto = modelMapper.map(bookCategoryEntity, BookCategoryResponseDto.class);
    return bookCategoryDto.toBuilder().totalBookCount(totalBookCount).readBookCount(readBookCount).build();
  }

  @Override
  public BookCategoryResponseDto editBookCategory(
      int bookCategoryId, BookCategoryRequestDto bookCategoryRequestDto) {

    String bookCategoryName = bookCategoryRequestDto.getName();
    if (bookCategoryRepository.existsByName(bookCategoryName)) {
      throw new UniqueConstraintViolationException(BookCategory.class, "name", bookCategoryName);
    }

    BookCategory bookCategoryEntity = bookCategoryRepository.retrieveOrElseThrow(bookCategoryId);
    modelMapper.map(bookCategoryRequestDto, bookCategoryEntity);
    bookCategoryEntity = bookCategoryRepository.save(bookCategoryEntity);

    return modelMapper.map(bookCategoryEntity, BookCategoryResponseDto.class);
  }

  @Override
  public void deleteBookCategory(int bookCategoryId) {
    bookCategoryRepository.deleteById(bookCategoryId);
  }
}
