package com.nickesqueda.laceybeesbookinventoryapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/book-categories")
public class BookCategoriesController {
  @GetMapping
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void getBookCategories() {}

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
