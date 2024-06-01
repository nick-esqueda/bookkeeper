package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.*;
import org.springframework.transaction.annotation.Transactional;

public class BookSearchIntegrationTest extends BaseIntegrationTest {

  @Test
  void getBooks_ShouldReturnPaginatedListOfBooks_GivenNoRequestParams() throws Exception {
    mockMvc
        .perform(get(allBooksUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(bookCount))) // !! replace with default page size!
        .andExpect(jsonPath("$.number").value(0)); // page number
  }

  @Test
  void getBooks_ShouldReturnPaginatedListOfBooks_GivenPaginationParams() throws Exception {
    mockMvc
        .perform(get(allBooksUriBuilder.path("?pageNumber=1&pageSize=1").build().toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(1)));
  }

  @Test
  @Transactional
  void getBooks_ShouldReturnEmptyList_GivenNoBooksInDatabase() throws Exception {
    bookRepository.deleteAll();
    mockMvc
        .perform(get(allBooksUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(0)));
  }

  @Test
  void getBooks_ShouldReturn400WithErrorResponse_GivenInvalidPaginationParams() throws Exception {
    Assertions.fail();
  } // zero page size, negative page #

  @Test
  void getBooks_ShouldReturnCorrectPageOfBooks_GivenSpecificPageNumber() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnTitle_GivenSearchQuery() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnAuthor_GivenSearchQuery() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnEdition_GivenSearchQuery() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnNotes_GivenSearchQuery() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnEmptyList_GivenNoMatchingSearchResultsInAnyColumn() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenSearchQueryAndFilters() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenReadStatusFilter() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnEmptyList_GivenInvalidReadStatusFilter() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenBookCategoryFilter() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnEmptyList_GivenInvalidCategoryFilter() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenMultipleFilters() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByTitleAscParam() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByTitleDescParam() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByAuthorAscParam() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByAuthorDescParam() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByEditionAscParam() throws Exception {
    Assertions.fail();
  } // should handle null edition

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByEditionDescParam() throws Exception {
    Assertions.fail();
  } // should handle null edition

  @Test
  void getBooks_ShouldReturn400WithErrorResponse_GivenInvalidSortByField() throws Exception {
    Assertions.fail();
  }

  @Test
  void getBooks_ShouldReturn400WithErrorResponse_GivenInvalidSortDirection() throws Exception {
    Assertions.fail();
  }

  // handle multiple sort orders? ex. sort by author, then title
}
