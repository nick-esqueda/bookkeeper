package com.nickesqueda.laceybeesbookinventoryapi.controller;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BookCategoriesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/book-categories")
@RequiredArgsConstructor
public class BookCategoriesController {

  private final BookCategoriesService bookCategoriesService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<BookCategoryResponseDto> getBookCategories() {
    return bookCategoriesService.getBookCategories();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public BookCategoryResponseDto createBookCategory(
      @RequestBody @Valid BookCategoryRequestDto bookCategoryRequestDto) {
    return bookCategoriesService.createBookCategory(bookCategoryRequestDto);
  }

  @GetMapping("/{bookCategoryId}")
  @ResponseStatus(HttpStatus.OK)
  public BookCategoryResponseDto getBookCategory(@PathVariable int bookCategoryId) {
    return bookCategoriesService.getBookCategory(bookCategoryId);
  }

  @PutMapping("/{bookCategoryId}")
  @ResponseStatus(HttpStatus.OK)
  public BookCategoryResponseDto editBookCategory(
      @PathVariable int bookCategoryId,
      @RequestBody @Valid BookCategoryRequestDto bookCategoryRequestDto) {
    return bookCategoriesService.editBookCategory(bookCategoryId, bookCategoryRequestDto);
  }

  @DeleteMapping("/{bookCategoryId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteBookCategory(@PathVariable int bookCategoryId) {
    bookCategoriesService.deleteBookCategory(bookCategoryId);
  }
}
