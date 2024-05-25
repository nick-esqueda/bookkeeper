package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.*;
import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.BookCategories.*;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
                .content(BOOK_CATEGORY_REQUEST_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  @Transactional
  void createBookCategory_ShouldReturn400WithErrorResponse_GivenNameAlreadyExists()
      throws Exception {

    mockMvc
        .perform(
            post(allBookCategoriesUri)
                .contentType(APPLICATION_JSON)
                .content(BOOK_CATEGORY_REQUEST_UNAVAILABLE_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage", containsString("unique")));
  }

  @Test
  @Transactional
  void createBookCategory_ShouldReturn400WithErrorResponse_GivenInvalidData() throws Exception {
    List<String> invalidRequestBodies =
        List.of(
            BOOK_CATEGORY_REQUEST_NULL_NAME,
            BOOK_CATEGORY_REQUEST_EMPTY_NAME,
            BOOK_CATEGORY_REQUEST_MAX_SIZE_NAME);

    for (String invalidRequestBody : invalidRequestBodies) {
      mockMvc
          .perform(
              post(allBookCategoriesUri).contentType(APPLICATION_JSON).content(invalidRequestBody))
          .andDo(print())
          .andExpect(status().isBadRequest())
          .andExpect(jsonPath("$.errorMessage").isNotEmpty())
          .andExpect(jsonPath("$.errorDetails", hasSize(1)));
    }
  }

  @Test
  void getBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  void getBookCategory_ShouldReturn404WithErrorResponse_GivenBookCategoryDoesNotExist()
      throws Exception {

    mockMvc
        .perform(get(bookCategoryUriBuilder.buildAndExpand(nonExistentBookCategoryId).toUri()))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("errorMessage").isNotEmpty());
  }

  @Test
  @Transactional
  void editBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(
            put(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_CATEGORY_REQUEST_UPDATED_NAME))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").value(TEST_STRING2));
  }

  @Test
  @Transactional
  void editBookCategory_ShouldReturn400WithErrorResponse_GivenNameAlreadyExists() throws Exception {
    mockMvc
        .perform(
            put(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_CATEGORY_REQUEST_UNAVAILABLE_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage", containsString("unique")));
  }

  @Test
  @Transactional
  void editBookCategory_ShouldReturn400WithErrorResponse_GivenInvalidData() throws Exception {
    mockMvc
        .perform(
            put(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_CATEGORY_REQUEST_NULL_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty())
        .andExpect(jsonPath("$.errorDetails", hasSize(1)));

    mockMvc
        .perform(
            put(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_CATEGORY_REQUEST_EMPTY_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty())
        .andExpect(jsonPath("$.errorDetails", hasSize(1)));
  }

  @Test
  @Transactional
  void editBookCategory_ShouldReturn404WithErrorResponse_GivenBookCategoryDoesNotExist()
      throws Exception {

    mockMvc
        .perform(
            put(bookCategoryUriBuilder.buildAndExpand(nonExistentBookCategoryId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_CATEGORY_REQUEST_UPDATED_NAME))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  @Transactional
  void deleteBookCategory_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(delete(bookCategoryUriBuilder.buildAndExpand(bookCategoryId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }

  @Test
  @Transactional
  void deleteBookCategory_ShouldStillReturn204_GivenBookCategoryDoesNotExist() throws Exception {
    mockMvc
        .perform(delete(bookCategoryUriBuilder.buildAndExpand(nonExistentBookCategoryId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }
}
