package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
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
  private final BookCategoryRepository bookCategoryRepository;
  private final ModelMapper modelMapper;

  @Override
  public List<BookResponseDto> getBooks() {
    List<Book> bookEntities = bookRepository.findAll();
    return bookEntities.stream()
        .map(bookEntity -> modelMapper.map(bookEntity, BookResponseDto.class))
        .toList();
  }

  @Override
  public BookResponseDto createBook(BookRequestDto bookRequestDto) {
    BookCategory bookCategoryEntity =
        bookCategoryRepository.retrieveOrElseThrow(bookRequestDto.getBookCategoryId());

    Book bookEntity = modelMapper.map(bookRequestDto, Book.class);
    bookEntity.setBookCategory(bookCategoryEntity);
    bookEntity = bookRepository.save(bookEntity);

    return modelMapper.map(bookEntity, BookResponseDto.class);
  }

  @Override
  public BookResponseDto getBook(int bookId) {
    Book bookEntity = bookRepository.retrieveOrElseThrow(bookId);
    return modelMapper.map(bookEntity, BookResponseDto.class);
  }

  @Override
  public BookResponseDto editBook(int bookId, BookRequestDto bookRequestDto) {
    Book bookEntity = bookRepository.retrieveOrElseThrow(bookId);
    modelMapper.map(bookRequestDto, bookEntity);
    bookEntity = bookRepository.save(bookEntity);

    return modelMapper.map(bookEntity, BookResponseDto.class);
  }

  @Override
  public void deleteBook(int bookId) {
    bookRepository.deleteById(bookId);
  }
}
