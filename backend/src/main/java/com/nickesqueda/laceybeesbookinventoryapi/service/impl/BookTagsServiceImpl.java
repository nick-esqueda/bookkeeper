package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookTagResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookTag;
import com.nickesqueda.laceybeesbookinventoryapi.exception.UniqueConstraintViolationException;
import com.nickesqueda.laceybeesbookinventoryapi.model.BookTagWithStats;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookTagRepository;
import com.nickesqueda.laceybeesbookinventoryapi.service.BookTagsService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookTagsServiceImpl implements BookTagsService {

  private final BookTagRepository bookTagRepository;
  private final ModelMapper modelMapper;

  @Override
  public List<BookTagResponseDto> getBookTags() {
    List<BookTagWithStats> bookTagEntities = bookTagRepository.findAllWithStats();
    return bookTagEntities.stream()
        .map(bookTagEntity -> modelMapper.map(bookTagEntity, BookTagResponseDto.class))
        .toList();
  }

  @Override
  public BookTagResponseDto createBookTag(BookTagRequestDto bookTagRequestDto) {
    String bookTagName = bookTagRequestDto.getName();
    if (bookTagRepository.existsByName(bookTagName)) {
      throw new UniqueConstraintViolationException(BookTag.class, "name", bookTagName);
    }

    BookTag bookTagEntity = modelMapper.map(bookTagRequestDto, BookTag.class);
    bookTagEntity = bookTagRepository.save(bookTagEntity);

    return modelMapper.map(bookTagEntity, BookTagResponseDto.class);
  }

  @Override
  public BookTagResponseDto getBookTag(Integer bookTagId) {
    BookTagWithStats bookTagEntity = bookTagRepository.retrieveWithStatsOrElseThrow(bookTagId);
    return modelMapper.map(bookTagEntity, BookTagResponseDto.class);
  }
}
