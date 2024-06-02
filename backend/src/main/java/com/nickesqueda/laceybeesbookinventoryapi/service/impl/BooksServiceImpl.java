package com.nickesqueda.laceybeesbookinventoryapi.service.impl;

import com.nickesqueda.laceybeesbookinventoryapi.dto.BookRequestDto;
import com.nickesqueda.laceybeesbookinventoryapi.dto.BookResponseDto;
import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookRepository;
import com.nickesqueda.laceybeesbookinventoryapi.service.BooksService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BooksServiceImpl implements BooksService {

  private final BookRepository bookRepository;
  private final BookCategoryRepository bookCategoryRepository;
  private final ModelMapper modelMapper;

  @Override
  public Page<BookResponseDto> getBooks(
      String readStatus, Integer bookCategoryId, PageRequest pageRequest) {

    Page<Book> bookEntities = bookRepository.findBooks(readStatus, bookCategoryId, pageRequest);
    return bookEntities.map(bookEntity -> modelMapper.map(bookEntity, BookResponseDto.class));
  }

  @Override
  public Page<BookResponseDto> searchBooks(
      String query, String readStatus, Integer bookCategoryId, PageRequest pageRequest) {

    Page<Book> bookEntities =
        bookRepository.searchBooks(query, readStatus, bookCategoryId, pageRequest);
    return bookEntities.map(bookEntity -> modelMapper.map(bookEntity, BookResponseDto.class));
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
    BookCategory bookCategoryEntity =
        bookCategoryRepository.retrieveOrElseThrow(bookRequestDto.getBookCategoryId());

    modelMapper.map(bookRequestDto, bookEntity);
    bookEntity.setBookCategory(bookCategoryEntity);
    bookEntity = bookRepository.save(bookEntity);

    return modelMapper.map(bookEntity, BookResponseDto.class);
  }

  @Override
  public void deleteBook(int bookId) {
    bookRepository.deleteById(bookId);
  }
}
