package com.nickesqueda.laceybeesbookinventoryapi.controller;

import static org.springframework.http.HttpStatus.*;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BooksService;
import jakarta.validation.Valid;
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
  @ResponseStatus(OK)
  public List<BookResponseDto> getBooks() {
    return booksService.getBooks();
  }

  @PostMapping
  @ResponseStatus(CREATED)
  public BookResponseDto createBook(@RequestBody @Valid BookRequestDto bookRequestDto) {
    return booksService.createBook(bookRequestDto);
  }

  @GetMapping("/{bookId}")
  @ResponseStatus(OK)
  public BookResponseDto getBook(@PathVariable int bookId) {
    return booksService.getBook(bookId);
  }

  @PutMapping("/{bookId}")
  @ResponseStatus(NOT_IMPLEMENTED)
  public void editBook() {}

  @DeleteMapping("/{bookId}")
  @ResponseStatus(NOT_IMPLEMENTED)
  public void deleteBook() {}
}
