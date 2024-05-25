package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookRepository;
import com.nickesqueda.laceybeesbookinventoryapi.service.BooksService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BooksServiceImpl implements BooksService {

  private final BookRepository bookRepository;
  private final ModelMapper modelMapper;

  @Override
  public List<BookResponseDto> getBooks() {
    List<Book> bookEntities = bookRepository.findAll();
    return bookEntities.stream()
        .map(bookEntity -> modelMapper.map(bookEntity, BookResponseDto.class))
        .toList();
  }

  @Override
  public BookResponseDto createBook() {
    return null;
  }

  @Override
  public BookResponseDto getBook() {
    return null;
  }

  @Override
  public BookResponseDto editBook() {
    return null;
  }

  @Override
  public void deleteBook() {}
}
