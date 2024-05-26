package com.nickesqueda.laceybeesbookinventoryapi.controller;

import static org.springframework.http.HttpStatus.*;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BooksService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
  @ResponseStatus(OK)
  public BookResponseDto editBook(
      @PathVariable int bookId, @RequestBody @Valid BookRequestDto bookRequestDto) {
    return booksService.editBook(bookId, bookRequestDto);
  }

  @DeleteMapping("/{bookId}")
  @ResponseStatus(NO_CONTENT)
  public void deleteBook(@PathVariable int bookId) {
    booksService.deleteBook(bookId);
  }
}
