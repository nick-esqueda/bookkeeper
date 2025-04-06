package com.nickesqueda.bookkeeperapi.service;

import com.nickesqueda.bookkeeperapi.dto.BookTagRequestDto;
import com.nickesqueda.bookkeeperapi.dto.BookTagResponseDto;
import java.util.List;

public interface BookTagsService {
  List<BookTagResponseDto> getBookTags();

  BookTagResponseDto createBookTag(BookTagRequestDto bookTagRequestDto);

  BookTagResponseDto getBookTag(Integer bookTagId);

  BookTagResponseDto editBookTag(Integer bookTagId, BookTagRequestDto bookTagRequestDto);

  void deleteBookTag(Integer bookTagId);
}
