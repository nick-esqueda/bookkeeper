package com.nickesqueda.laceybeesbookinventoryapi.controller;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.service.BookTagsService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/book-tags")
@RequiredArgsConstructor
@Validated
public class BookTagsController {

  private final BookTagsService bookTagsService;

  @GetMapping
  @ResponseStatus(HttpStatus.OK)
  public List<BookTagResponseDto> getBookTags() {
    return bookTagsService.getBookTags();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public BookTagResponseDto createBookTag(@RequestBody @Valid BookTagRequestDto bookTagRequestDto) {
    return bookTagsService.createBookTag(bookTagRequestDto);
  }

  @GetMapping("/{bookTagId}")
  @ResponseStatus(HttpStatus.OK)
  public BookTagResponseDto getBookTag(@PathVariable @Min(1) Integer bookTagId) {
    return bookTagsService.getBookTag(bookTagId);
  }
}
