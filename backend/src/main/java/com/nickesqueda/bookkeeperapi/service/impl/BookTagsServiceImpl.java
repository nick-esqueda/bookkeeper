package com.nickesqueda.bookkeeperapi.service.impl;

import com.nickesqueda.bookkeeperapi.dto.BookTagRequestDto;
import com.nickesqueda.bookkeeperapi.dto.BookTagResponseDto;
import com.nickesqueda.bookkeeperapi.entity.BookTag;
import com.nickesqueda.bookkeeperapi.exception.UniqueConstraintViolationException;
import com.nickesqueda.bookkeeperapi.model.BookTagWithStats;
import com.nickesqueda.bookkeeperapi.repository.BookTagRepository;
import com.nickesqueda.bookkeeperapi.service.BookTagsService;
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

  @Override
  public BookTagResponseDto editBookTag(Integer bookTagId, BookTagRequestDto bookTagRequestDto) {
    String bookTagName = bookTagRequestDto.getName();
    if (bookTagRepository.existsByName(bookTagName)) {
      throw new UniqueConstraintViolationException(BookTag.class, "name", bookTagName);
    }

    BookTag bookTagEntity = bookTagRepository.retrieveOrElseThrow(bookTagId);
    modelMapper.map(bookTagRequestDto, bookTagEntity);
    bookTagRepository.save(bookTagEntity);

    BookTagWithStats bookTagWithStats = bookTagRepository.retrieveWithStatsOrElseThrow(bookTagId);
    return modelMapper.map(bookTagWithStats, BookTagResponseDto.class);
  }

  @Override
  public void deleteBookTag(Integer bookTagId) {
    bookTagRepository.deleteById(bookTagId);
  }
}
