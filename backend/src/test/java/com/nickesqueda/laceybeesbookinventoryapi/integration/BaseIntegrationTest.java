package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.*;

import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookRepository;
import java.net.URI;
import java.util.List;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.UriComponentsBuilder;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class BaseIntegrationTest {

  @Autowired MockMvc mockMvc;
  @Autowired BookCategoryRepository bookCategoryRepository;
  @Autowired BookRepository bookRepository;

  static URI baseUri;
  static URI allBookCategoriesUri;
  static URI allBooksUri;
  static UriComponentsBuilder allBooksUriBuilder;
  static UriComponentsBuilder bookCategoryUriBuilder;
  static UriComponentsBuilder bookUriBuilder;
  static int bookCategoryId;
  static int nonExistentBookCategoryId;
  static int bookCategoryCount;
  static int bookId;
  static int nonExistentBookId;
  static int bookCount;

  @BeforeAll
  static void initialize() {
    bookCategoryId = 1;
    nonExistentBookCategoryId = 1000;
    bookId = 1;
    nonExistentBookId = 1000;

    baseUri = UriComponentsBuilder.newInstance().path("/api/v1").build().toUri();
    allBookCategoriesUri =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories").build().toUri();
    allBooksUriBuilder = UriComponentsBuilder.fromUri(baseUri).path("/books");
    allBooksUri = allBooksUriBuilder.build().toUri();
    bookCategoryUriBuilder =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories/{bookCategoryId}");
    bookUriBuilder = UriComponentsBuilder.fromUri(baseUri).path("/books/{bookId}");

  }

  @BeforeAll
  void setUpDb() {
    // only insert test records if DB is empty.
    // note: ran into errors when attempting to TRUNCATE tables instead.
    if (bookCategoryRepository.count() == 0) {
      List<BookCategory> bookCategories = List.of(fiction, nonFiction, classics, cookbooks);
      bookCategoryRepository.saveAll(bookCategories);
    }
    if (bookRepository.count() == 0) {
      List<Book> books = List.of(book1, book2, book3, book4, book5, book6, book7, book8);
      bookRepository.saveAll(books);
    }

    bookCategoryCount = (int) bookCategoryRepository.count();
    bookCount = (int) bookRepository.count();
  }
}
