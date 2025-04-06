package com.nickesqueda.bookkeeperapi.controller;

import static org.springframework.http.HttpStatus.*;

import com.nickesqueda.bookkeeperapi.dto.BookRequestDto;
import com.nickesqueda.bookkeeperapi.dto.BookResponseDto;
import com.nickesqueda.bookkeeperapi.service.BooksService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BooksController {

  private final BooksService booksService;

  @GetMapping
  @ResponseStatus(OK)
  public Page<BookResponseDto> getBooks(
      @RequestParam(required = false) String query,
      @RequestParam(required = false) String readStatus,
      @RequestParam(required = false) @Min(1) Integer bookCategoryId,
      @RequestParam(required = false) List<Integer> bookTagIds,
      @RequestParam(defaultValue = "0") Integer pageNum,
      @RequestParam(defaultValue = "10") Integer pageSize,
      @RequestParam(defaultValue = "title")
          @Pattern(regexp = "title|author|edition", flags = Pattern.Flag.CASE_INSENSITIVE)
          String sortBy,
      @RequestParam(defaultValue = "asc")
          @Pattern(regexp = "asc|desc", flags = Pattern.Flag.CASE_INSENSITIVE)
          String sortDir) {

    Sort sort =
        sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
            ? Sort.by(sortBy).ascending()
            : Sort.by(sortBy).descending();
    PageRequest pageRequest = PageRequest.of(pageNum, pageSize, sort);

    if ("".equalsIgnoreCase(readStatus)) {
      readStatus = null;
    }
    if (bookCategoryId != null && bookCategoryId == 0) {
      bookCategoryId = null;
    }

    if (query != null && !query.isEmpty()) {
      return booksService.searchBooks(query, readStatus, bookCategoryId, bookTagIds, pageRequest);
    } else {
      return booksService.getBooks(readStatus, bookCategoryId, bookTagIds, pageRequest);
    }
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
