package com.nickesqueda.laceybeesbookinventoryapi.controller;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BooksService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BooksController {

  private final BooksService booksService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<BookResponseDto> getBooks() {
    return booksService.getBooks();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void createBook() {}

  @GetMapping("/{bookId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void getBook() {}

  @PutMapping("/{bookId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void editBook() {}

  @DeleteMapping("/{bookId}")
  @ResponseStatus(HttpStatus.NOT_IMPLEMENTED)
  public void deleteBook() {}
}
