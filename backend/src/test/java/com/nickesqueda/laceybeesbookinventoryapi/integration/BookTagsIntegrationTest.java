package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.*;
import static com.nickesqueda.laceybeesbookinventoryapi.testutils.TestConstants.BookTags.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.nickesqueda.laceybeesbookinventoryapi.entity.BookTag;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.transaction.annotation.Transactional;

public class BookTagsIntegrationTest extends BaseIntegrationTest {
  // TODO: update Book integration tests to include any book tag checks.

  @Test
  void getBookTags_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(allBookTagsUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(bookTagCount)));
  }

  @Test
  void getBookTags_ShouldReturnBookStatsForEachTag_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(allBookTagsUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(bookTagCount)))
        .andExpect(jsonPath("$[0].totalBookCount", greaterThan(0)))
        .andExpect(jsonPath("$[0].readBookCount").isNotEmpty())
        .andExpect(jsonPath("$[0].unreadBookCount").isNotEmpty())
        .andExpect(jsonPath("$[0].didNotFinishBookCount").isNotEmpty())
        .andExpect(jsonPath("$[0].authorCount").isNotEmpty());
  }

  @Test
  @Transactional
  void createBookTag_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(post(allBookTagsUri).contentType(APPLICATION_JSON).content(BOOK_TAG_REQUEST_JSON))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  @Transactional
  void createBookTag_ShouldReturn400WithErrorResponse_GivenNameAlreadyExists() throws Exception {
    mockMvc
        .perform(
            post(allBookTagsUri)
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UNAVAILABLE_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage", containsString("unique")));
  }

  @Test
  @Transactional
  void createBookTag_ShouldReturn400WithErrorResponse_GivenInvalidData() throws Exception {
    List<String> invalidRequestBodies =
        List.of(
            BOOK_TAG_REQUEST_NULL_NAME,
            BOOK_TAG_REQUEST_EMPTY_NAME,
            BOOK_TAG_REQUEST_MAX_SIZE_NAME);

    for (String invalidRequestBody : invalidRequestBodies) {
      mockMvc
          .perform(post(allBookTagsUri).contentType(APPLICATION_JSON).content(invalidRequestBody))
          .andDo(print())
          .andExpect(status().isBadRequest())
          .andExpect(jsonPath("$.errorMessage").isNotEmpty())
          .andExpect(jsonPath("$.errorDetails", hasSize(1)));
    }
  }

  @Test
  void getBookTag_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(get(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(autumnBookTagId))
        .andExpect(jsonPath("$.name").isNotEmpty())
        .andExpect(jsonPath("$.createdAt").isNotEmpty())
        .andExpect(jsonPath("$.updatedAt").isNotEmpty());
  }

  @Test
  @Transactional
  void getBookTag_ShouldReturnTagNameInLowercase_GivenValidRequest() throws Exception {
    BookTag uppercaseBookTag = BookTag.builder().name("UPPERCASE").build();
    bookTagRepository.save(uppercaseBookTag);

    mockMvc
        .perform(get(bookTagUriBuilder.buildAndExpand(uppercaseBookTag.getId()).toUri()))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").value("uppercase"));
  }

  @Test
  void getBookTag_ShouldReturnBookStats_GivenValidRequest() throws Exception { // TODO
    //    int totalBookCount = bookRepository.countByBookCategoryId(autumnBookTagId);
    //    int readBookCount =
    //        bookRepository.countByBookCategoryIdAndReadStatus(autumnBookTagId, ReadStatus.READ);
    //    int unreadBookCount =
    //        bookRepository.countByBookCategoryIdAndReadStatus(autumnBookTagId, ReadStatus.UNREAD);
    //    int didNotFinishBookCount =
    //        bookRepository.countByBookCategoryIdAndReadStatus(
    //            autumnBookTagId, ReadStatus.DID_NOT_FINISH);
    //    int authorCount = bookRepository.countAuthorsInBookCategory(autumnBookTagId);
    //
    //    mockMvc
    //        .perform(get(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri()))
    //        .andDo(print())
    //        .andExpect(status().isOk())
    //        .andExpect(jsonPath("$.id").value(autumnBookTagId))
    //        .andExpect(jsonPath("$.name").isNotEmpty())
    //        .andExpect(jsonPath("$.totalBookCount").value(totalBookCount))
    //        .andExpect(jsonPath("$.readBookCount").value(readBookCount))
    //        .andExpect(jsonPath("$.unreadBookCount").value(unreadBookCount))
    //        .andExpect(jsonPath("$.didNotFinishBookCount").value(didNotFinishBookCount))
    //        .andExpect(jsonPath("$.authorCount").value(authorCount));
    fail();
  }

  @Test
  void getBookTag_ShouldReturn404WithErrorResponse_GivenBookTagDoesNotExist() throws Exception {
    mockMvc
        .perform(get(bookTagUriBuilder.buildAndExpand(nonExistentBookTagId).toUri()))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("errorMessage").isNotEmpty());
  }

  @Test
  @Transactional
  void editBookTag_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UPDATED_NAME))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").isNotEmpty())
        .andExpect(jsonPath("$.name").value(TEST_STRING2.toLowerCase()));
  }

  @Test
  @Transactional
  void editBookTag_ShouldReturnBookStats_GivenValidRequest() throws Exception {
    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UPDATED_NAME))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(autumnBookTagId))
        .andExpect(jsonPath("$.name").isNotEmpty())
        .andExpect(jsonPath("$.totalBookCount").isNotEmpty())
        .andExpect(jsonPath("$.readBookCount").isNotEmpty())
        .andExpect(jsonPath("$.unreadBookCount").isNotEmpty())
        .andExpect(jsonPath("$.didNotFinishBookCount").isNotEmpty())
        .andExpect(jsonPath("$.authorCount").isNotEmpty());
  }

  @Test
  @Transactional
  void editBookTag_ShouldAllowChangingCase_GivenExistingTagNameWithDifferentCase()
      throws Exception {
    // original name value: "autumn"
    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UPDATED_CASE_AUTUMN))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value("Autumn"));
  }

  @Test
  @Transactional
  void editBookTag_ShouldReturn400WithErrorResponse_GivenCaseInsensitiveNameAlreadyExists()
      throws Exception {
    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UNAVAILABLE_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage", containsString("unique")));

    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UNAVAILABLE_NAME_UPPERCASE))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage", containsString("unique")));
  }

  @Test
  @Transactional
  void editBookTag_ShouldReturn400WithErrorResponse_GivenInvalidData() throws Exception {
    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_NULL_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty())
        .andExpect(jsonPath("$.errorDetails", hasSize(1)));

    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_EMPTY_NAME))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty())
        .andExpect(jsonPath("$.errorDetails", hasSize(1)));
  }

  @Test
  @Transactional
  void editBookTag_ShouldReturn404WithErrorResponse_GivenTagDoesNotExist() throws Exception {
    mockMvc
        .perform(
            put(bookTagUriBuilder.buildAndExpand(nonExistentBookTagId).toUri())
                .contentType(APPLICATION_JSON)
                .content(BOOK_TAG_REQUEST_UPDATED_NAME))
        .andDo(print())
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  @Transactional
  void deleteTag_ShouldReturnSuccessfulResponse_GivenValidRequest() throws Exception {
    mockMvc
        .perform(delete(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }

  @Test
  @Transactional
  void deleteTag_ShouldDeleteAssociatedBooks_GivenValidRequest() throws Exception {
    mockMvc
        .perform(delete(bookTagUriBuilder.buildAndExpand(autumnBookTagId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());

    Assertions.assertEquals(0, bookTagRepository.count());
  }

  @Test
  @Transactional
  void deleteTag_ShouldStillReturn204_GivenTagDoesNotExist() throws Exception {
    mockMvc
        .perform(delete(bookTagUriBuilder.buildAndExpand(nonExistentBookTagId).toUri()))
        .andDo(print())
        .andExpect(status().isNoContent());
  }
}
