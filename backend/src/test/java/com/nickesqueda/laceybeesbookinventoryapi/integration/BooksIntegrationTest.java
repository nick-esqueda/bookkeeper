package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.*;
import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.Books.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

public class BooksIntegrationTest extends BaseIntegrationTest {

  @Test
  void getBooks_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(allBooksUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(bookCount)));
  }

  @Test
  @Transactional
  void createBook_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(post(allBooksUri).contentType(APPLICATION_JSON).content(BOOK_REQUEST_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.title").value(TEST_TITLE))
        .andExpect(jsonPath("$.author").value(TEST_AUTHOR))
        .andExpect(jsonPath("$.edition").value(TEST_EDITION))
        .andExpect(jsonPath("$.notes").value(TEST_NOTES))
        .andExpect(jsonPath("$.readStatus").value(READ_STATUS_READ))
        .andExpect(jsonPath("$.bookCategory").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.id").value(TEST_BOOK_CATEGORY_ID))
        .andExpect(jsonPath("$.bookCategory.name").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.updatedAt").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  @Transactional
  void createBook_ShouldReturn400WithErrorResponse_GivenInvalidData() throws Exception {
    List<String> invalidRequestBodies =
        List.of(
            BOOK_REQUEST_NULL_TITLE,
            BOOK_REQUEST_NULL_AUTHOR,
            BOOK_REQUEST_NULL_READ_STATUS,
            BOOK_REQUEST_NULL_BOOK_CATEGORY_ID,
            BOOK_REQUEST_EMPTY_TITLE,
            BOOK_REQUEST_EMPTY_AUTHOR,
            BOOK_REQUEST_EMPTY_EDITION,
            BOOK_REQUEST_EMPTY_NOTES,
            BOOK_REQUEST_EMPTY_READ_STATUS,
            BOOK_REQUEST_MAX_SIZE_TITLE,
            BOOK_REQUEST_MAX_SIZE_AUTHOR,
            BOOK_REQUEST_MAX_SIZE_EDITION,
            BOOK_REQUEST_MAX_SIZE_NOTES,
            BOOK_REQUEST_INVALID_READ_STATUS);

    for (String invalidRequestBody : invalidRequestBodies) {
      mockMvc
          .perform(post(allBooksUri).contentType(APPLICATION_JSON).content(invalidRequestBody))
          .andDo(print())
          .andExpect(status().isBadRequest())
          .andExpect(jsonPath("$.errorMessage").isNotEmpty())
          .andExpect(jsonPath("$.errorDetails", hasSize(1)));
    }
  }

  @Test
  @Transactional
  void createBook_ShouldReturn404WithErrorResponse_GivenBookCategoryIdDoesNotExist()
      throws Exception {

    mockMvc
        .perform(
            post(allBooksUri)
                .contentType(APPLICATION_JSON)
                .content(BOOK_REQUEST_NON_EXISTENT_BOOK_CATEGORY_ID))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  void getBook_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(bookUriBuilder.buildAndExpand(bookId).toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.title").isNotEmpty())
        .andExpect(jsonPath("$.author").isNotEmpty())
        .andExpect(jsonPath("$.readStatus").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.id").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.name").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.updatedAt").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  void getBook_shouldReturn404WithErrorResponse_GivenBookDoesNotExist() throws Exception {
    mockMvc
        .perform(get(bookUriBuilder.buildAndExpand(nonExistentBookId).toUri()))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  @Transactional
  void editBook_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(
            put(bookUriBuilder.buildAndExpand(bookId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_REQUEST_UPDATED_READ_STATUS))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(bookId))
        .andExpect(jsonPath("$.title").value(TEST_TITLE))
        .andExpect(jsonPath("$.author").value(TEST_AUTHOR))
        .andExpect(jsonPath("$.edition").value(TEST_EDITION))
        .andExpect(jsonPath("$.notes").value(TEST_NOTES))
        .andExpect(jsonPath("$.readStatus").value(READ_STATUS_UNREAD))
        .andExpect(jsonPath("$.bookCategory").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.id").value(TEST_BOOK_CATEGORY_ID))
        .andExpect(jsonPath("$.bookCategory.name").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.bookCategory.updatedAt").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  @Transactional
  void editBook_ShouldReturn400WithErrorResponse_GivenInvalidData() throws Exception {
    List<String> invalidRequestBodies =
        List.of(
            BOOK_REQUEST_NULL_TITLE,
            BOOK_REQUEST_NULL_AUTHOR,
            BOOK_REQUEST_NULL_READ_STATUS,
            BOOK_REQUEST_NULL_BOOK_CATEGORY_ID,
            BOOK_REQUEST_EMPTY_TITLE,
            BOOK_REQUEST_EMPTY_AUTHOR,
            BOOK_REQUEST_EMPTY_EDITION,
            BOOK_REQUEST_EMPTY_NOTES,
            BOOK_REQUEST_EMPTY_READ_STATUS,
            BOOK_REQUEST_MAX_SIZE_TITLE,
            BOOK_REQUEST_MAX_SIZE_AUTHOR,
            BOOK_REQUEST_MAX_SIZE_EDITION,
            BOOK_REQUEST_MAX_SIZE_NOTES,
            BOOK_REQUEST_INVALID_READ_STATUS);

    for (String invalidRequestBody : invalidRequestBodies) {
      mockMvc
          .perform(
              put(bookUriBuilder.buildAndExpand(bookId).toUri())
                  .contentType(APPLICATION_JSON)
                  .content(invalidRequestBody))
          .andDo(print())
          .andExpect(status().isBadRequest())
          .andExpect(jsonPath("$.errorMessage").isNotEmpty())
          .andExpect(jsonPath("$.errorDetails", hasSize(1)));
    }
  }

  @Test
  @Transactional
  void editBook_ShouldReturn404WithErrorResponse_GivenBookDoesNotExist() throws Exception {
    mockMvc
        .perform(
            put(bookUriBuilder.buildAndExpand(bookId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_REQUEST_UPDATED_READ_STATUS))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  @Transactional
  void deleteBook_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(delete(bookUriBuilder.buildAndExpand(bookId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }

  @Test
  @Transactional
  void deleteBook_ShouldStillReturn204_GivenBookDoesNotExist() throws Exception {
    mockMvc
        .perform(delete(bookUriBuilder.buildAndExpand(nonExistentBookId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }
}
