package com.nickesqueda.laceybeesbookinventoryapi.integration;

import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookRepository;
import java.net.URI;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.UriComponentsBuilder;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@ActiveProfiles("integration-test")
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
  static UriComponentsBuilder bookCategoryUriBuilder;
  static UriComponentsBuilder bookUriBuilder;
  static int fictionBookCategoryId;
  static int nonExistentBookCategoryId;
  static int bookCategoryCount;
  static int bookId;
  static int nonExistentBookId;
  static int bookCount;

  @BeforeAll
  static void initialize() {
    fictionBookCategoryId = 1;
    nonExistentBookCategoryId = 1000;
    bookId = 1;
    nonExistentBookId = 1000;

    baseUri = UriComponentsBuilder.newInstance().path("/api/v1").build().toUri();
    allBookCategoriesUri =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories").build().toUri();
    allBooksUri = UriComponentsBuilder.fromUri(baseUri).path("/books").build().toUri();
    bookCategoryUriBuilder =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories/{bookCategoryId}");
    bookUriBuilder = UriComponentsBuilder.fromUri(baseUri).path("/books/{bookId}");
  }

  @BeforeAll
  void initializeDbCounts() {
    bookCategoryCount = (int) bookCategoryRepository.count();
    bookCount = (int) bookRepository.count();
  }
}
