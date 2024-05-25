package com.nickesqueda.laceybeesbookinventoryapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/books")
public class BooksController {
  @GetMapping
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void getBooks() {}

  @PostMapping
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void createBook() {}

  @GetMapping("/{bookId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void getBook() {}

  @PutMapping("/{bookId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void updateBook() {}

  @DeleteMapping("/{bookId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void deleteBook() {}
}
