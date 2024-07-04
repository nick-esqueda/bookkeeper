package com.nickesqueda.laceybeesbookinventoryapi.service;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagResponseDto;
import java.util.List;

public interface BookTagsService {
  List<BookTagResponseDto> getBookTags();

  BookTagResponseDto createBookTag(BookTagRequestDto bookTagRequestDto);

  BookTagResponseDto getBookTag(Integer bookTagId);
}
