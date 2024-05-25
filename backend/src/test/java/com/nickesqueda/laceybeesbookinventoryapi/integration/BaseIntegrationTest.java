package com.nickesqueda.laceybeesbookinventoryapi.integration;

import java.net.URI;

import com.nickesqueda.laceybeesbookinventoryapi.repository.BookCategoryRepository;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.util.UriComponentsBuilder;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
public abstract class BaseIntegrationTest {

  @Autowired MockMvc mockMvc;
  @Autowired BookCategoryRepository bookCategoryRepository;

  static URI baseUri;
  static URI allBookCategoriesUri;
  static UriComponentsBuilder bookCategoryUriBuilder;
  static int bookCategoryId;
  static int nonExistentBookCategoryId;
  static int bookCategoryCount;

  @BeforeAll
  static void setUp() {
    bookCategoryId = 1;
    nonExistentBookCategoryId = 1000;

    baseUri = UriComponentsBuilder.newInstance().path("/api/v1").build().toUri();
    allBookCategoriesUri =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories").build().toUri();
    bookCategoryUriBuilder =
        UriComponentsBuilder.fromUri(baseUri).path("/book-categories/{bookCategoryId}");
  }

  @BeforeEach
  void beforeEach() {
    bookCategoryCount = (int) bookCategoryRepository.count();
  }
}
