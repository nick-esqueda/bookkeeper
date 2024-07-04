package com.nickesqueda.laceybeesbookinventoryapi.integration;

import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import com.nickesqueda.laceybeesbookinventoryapi.repository.BookRepository;
import java.net.URI;

import com.nickesqueda.laceybeesbookinventoryapi.repository.BookTagRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
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
  @Autowired BookTagRepository bookTagRepository;

  static URI baseUri;
  static URI allBookCategoriesUri;
  static URI allBooksUri;
  static URI allBookTagsUri;
  static UriComponentsBuilder bookCategoryUriBuilder;
  static UriComponentsBuilder bookUriBuilder;
  static UriComponentsBuilder bookTagUriBuilder;
  static int fictionBookCategoryId;
  static int nonExistentBookCategoryId;
  static int bookCategoryCount;
  static int bookId;
  static int nonExistentBookId;
  static int bookCount;
  static int autumnBookTagId;
  static int nonExistentBookTagId;
  static int bookTagCount;
  static String bookTagName;

  @BeforeAll
  static void initialize() {
    fictionBookCategoryId = 1;
    nonExistentBookCategoryId = 1000;
    bookId = 1;
    nonExistentBookId = 1000;
    autumnBookTagId = 1;
    nonExistentBookTagId = 1000;

    baseUri = UriComponentsBuilder.newInstance().path("/api/v1").build().toUri();
    allBookCategoriesUri =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories").build().toUri();
    allBooksUri = UriComponentsBuilder.fromUri(baseUri).path("/books").build().toUri();
    bookCategoryUriBuilder =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories/{bookCategoryId}");
    bookUriBuilder = UriComponentsBuilder.fromUri(baseUri).path("/books/{bookId}");
    allBookTagsUri = UriComponentsBuilder.fromUri(baseUri).path("/book-tags").build().toUri();
    bookTagUriBuilder = UriComponentsBuilder.fromUri(baseUri).path("/books-tags/{bookTagId}");
  }

  @BeforeEach
  void initializeDbCounts() {
    bookCategoryCount = (int) bookCategoryRepository.count();
    bookCount = (int) bookRepository.count();
    bookTagCount = (int) bookTagRepository.count();
    bookTagName = bookTagRepository.findById(autumnBookTagId).orElseThrow().getName();
  }
}
