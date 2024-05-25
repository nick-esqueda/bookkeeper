package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

public class BookCategoriesIntegrationTest extends BaseIntegrationTest {

  @Test
  void getBookCategories_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(allBookCategoriesUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(bookCategoryCount)));
  }

  @Test
  @Transactional
  void createBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(
            post(allBookCategoriesUri)
                .contentType(APPLICATION_JSON)
                .content(CREATE_BOOK_CATEGORY_REQUEST_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").isNotEmpty());
  }

  @Test
  void getBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").value(TEST_STRING));
  }

  @Test
  @Transactional
  void editBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(
            put(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri())
                .contentType(APPLICATION_JSON)
                .content(UPDATE_BOOK_CATEGORY_REQUEST_JSON))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").value(TEST_STRING2));
  }

  @Test
  @Transactional
  void deleteBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(delete(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }
}
