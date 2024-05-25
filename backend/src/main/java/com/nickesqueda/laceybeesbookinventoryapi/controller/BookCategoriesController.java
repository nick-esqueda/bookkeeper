package com.nickesqueda.laceybeesbookinventoryapi.controller;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookCategoryResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BookCategoriesService;
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
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void createBookCategory() {}

  @GetMapping("/{bookCategoryId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void getBookCategory() {}

  @PutMapping("/{bookCategoryId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void editBookCategory() {}

  @DeleteMapping("/{bookCategoryId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void deleteBookCategory() {}
}
