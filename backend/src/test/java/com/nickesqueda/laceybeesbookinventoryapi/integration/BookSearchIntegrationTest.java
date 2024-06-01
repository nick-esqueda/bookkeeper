package com.nickesqueda.laceybeesbookinventoryapi.integration;

import static org.hamcrest.Matchers.containsString;
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
    // default page size = 10
    // number of test books in DB = 8
    mockMvc
        .perform(get(allBooksUri))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(bookCount)))
        .andExpect(jsonPath("$.number").value(0)); // page number
  }

  @Test
  void getBooks_ShouldReturnPaginatedListOfBooks_GivenPaginationParams() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("pageNum", 0)
                    .queryParam("pageSize", 1)
                    .build()
                    .toUri()))
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
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("pageNum", -1)
                    .queryParam("pageSize", 1)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());

    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("pageNum", 1)
                    .queryParam("pageSize", 0)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());

    mockMvc
        .perform(get(allBooksUriBuilder.path("?pageNum=&pageSize=1").build().toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());

    mockMvc
        .perform(get(allBooksUriBuilder.path("?pageNum=1&pageSize=").build().toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  void getBooks_ShouldReturn400WithErrorResponse_GivenPageDoesNotExist() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("pageNum", 1000)
                    .queryParam("pageSize", 1)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  void getBooks_ShouldReturnCorrectPage_GivenSpecificPageNumber() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("pageNum", 2)
                    .queryParam("pageSize", 1)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.number").value(2));
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnTitle_GivenValidSearchQuery() throws Exception {
    mockMvc
        .perform(get(allBooksUriBuilder.path("?").queryParam("query", "Apple").build().toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].title").value("Apple"));

    mockMvc
        .perform(get(allBooksUriBuilder.path("?").queryParam("query", "Banana").build().toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].title").value("Banana Banana"));
  }

  @Test
  void getBooks_ShouldReturnCaseInsensitiveResults_GivenValidSearchQuery() throws Exception {
    mockMvc
        .perform(get(allBooksUriBuilder.path("?").queryParam("query", "Apple").build().toUri()))
        .andDo(print())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].title").value("Apple"));
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnAuthor_GivenValidSearchQuery() throws Exception {
    mockMvc
        .perform(get(allBooksUriBuilder.path("?").queryParam("query", "Zack").build().toUri()))
        .andDo(print())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].title").value("Zack Brown"));
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnEdition_GivenValidSearchQuery() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("query", "Another Edition")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].edition").value("Another Edition"));
  }

  @Test
  void getBooks_ShouldReturnAccurateResultsBasedOnNotes_GivenValidSearchQuery() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("query", "am a note")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].notes").value("I am a note."));
  }

  @Test
  void getBooks_ShouldReturnEmptyList_GivenNoMatchingSearchResultsInAnyColumn() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("query", "should not match anything")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(0)));
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenReadStatusFilter() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("readStatus", "READ")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(3)))
        .andExpect(jsonPath("$.content[0].readStatus").value("READ"))
        .andExpect(jsonPath("$.content[1].readStatus").value("READ"))
        .andExpect(jsonPath("$.content[2].readStatus").value("READ"));
  }

  @Test
  void getBooks_ShouldReturnEmptyList_GivenInvalidReadStatusFilter() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("readStatus", "KIND_OF_READ")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(0)));
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenBookCategoryFilter() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("bookCategoryId", 1)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(2)))
        .andExpect(jsonPath("$.content[0].bookCategory.id").value(1))
        .andExpect(jsonPath("$.content[1].bookCategory.id").value(1));
  }

  @Test
  void getBooks_ShouldReturnEmptyList_GivenInvalidCategoryFilter() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("bookCategoryId", 10000)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(0)));
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenMultipleFilters() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("bookCategoryId", 2)
                    .queryParam("readStatus", "UNREAD")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].bookCategory.id").value(2))
        .andExpect(jsonPath("$.content[0].readStatus").value("UNREAD"));
  }

  @Test
  void getBooks_ShouldReturnCorrectResults_GivenValidSearchQueryAndFilters() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("query", "Tyler")
                    .queryParam("bookCategoryId", 3)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].author").value("Tyler Tyler"))
        .andExpect(jsonPath("$.content[0].bookCategory.id").value(3));

    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("query", "notes")
                    .queryParam("readStatus", "UNREAD")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(1)))
        .andExpect(jsonPath("$.content[0].notes", containsString("notes")))
        .andExpect(jsonPath("$.content[0].readStatus", containsString("UNREAD")));
  }

  @Test
  void getBooks_ShouldReturnDefaultAscSortedList_GivenSortByWithoutSortDir() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "title")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].title").value("Apple"))
        .andExpect(jsonPath("$.content[1].title").value("Banana Banana"))
        .andExpect(jsonPath("$.content[2].title").value("Cucumber"))
        .andExpect(jsonPath("$.content[3].title").value("Date Date"));

    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "author")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].author").value("Sydney Sydney"))
        .andExpect(jsonPath("$.content[1].author").value("Tyler Tyler"))
        .andExpect(jsonPath("$.content[2].author").value("Ulysses"))
        .andExpect(jsonPath("$.content[3].author").value("Vincent Vincent Vincent"));
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByTitleAscParam() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "title")
                    .queryParam("sortDir", "asc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].title").value("Apple"))
        .andExpect(jsonPath("$.content[1].title").value("Banana Banana"))
        .andExpect(jsonPath("$.content[2].title").value("Cucumber"))
        .andExpect(jsonPath("$.content[3].title").value("Date Date"));
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByTitleDescParam() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "title")
                    .queryParam("sortDir", "desc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].title").value("Horseradish Horseradish"))
        .andExpect(jsonPath("$.content[1].title").value("Grape"))
        .andExpect(jsonPath("$.content[2].title").value("Fig Fig"))
        .andExpect(jsonPath("$.content[3].title").value("Eggplant"));
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByAuthorAscParam() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "author")
                    .queryParam("sortDir", "asc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].author").value("Sydney Sydney"))
        .andExpect(jsonPath("$.content[1].author").value("Tyler Tyler"))
        .andExpect(jsonPath("$.content[2].author").value("Ulysses"))
        .andExpect(jsonPath("$.content[3].author").value("Vincent Vincent Vincent"));
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByAuthorDescParam() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "author")
                    .queryParam("sortDir", "desc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].author").value("Zack Brown"))
        .andExpect(jsonPath("$.content[1].author").value("Yvonne"))
        .andExpect(jsonPath("$.content[2].author").value("Xander Xander"))
        .andExpect(jsonPath("$.content[3].author").value("Waylon"));
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByEditionAscParam() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "edition")
                    .queryParam("sortDir", "asc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].edition").isEmpty())
        .andExpect(jsonPath("$.content[1].edition").isEmpty())
        .andExpect(jsonPath("$.content[2].edition").value("Another Edition"))
        .andExpect(jsonPath("$.content[2].edition").value("Another Edition"));
  }

  @Test
  void getBooks_ShouldReturnCorrectlySortedList_GivenSortByEditionDescParam() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "edition")
                    .queryParam("sortDir", "desc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content[0].edition").value("Some Edition"))
        .andExpect(jsonPath("$.content[1].edition").value("Some Edition"))
        .andExpect(jsonPath("$.content[2].edition").value("Edition edition"))
        .andExpect(jsonPath("$.content[2].edition").value("Another Edition"));
  }

  @Test
  void getBooks_ShouldReturn400WithErrorResponse_GivenInvalidSortByField() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "invalid")
                    .queryParam("sortDir", "desc")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());

    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "invalid")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  void getBooks_ShouldReturn400WithErrorResponse_GivenInvalidSortDirection() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "title")
                    .queryParam("sortDir", "invalid")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());

    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("sortBy", "author")
                    .queryParam("sortDir", "invalid")
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errorMessage").isNotEmpty());
  }

  @Test
  void getBooks_ShouldReturnAccurateResults_GivenSearchFilterSortAndPaginationParams() throws Exception {
    mockMvc
        .perform(
            get(
                allBooksUriBuilder
                    .path("?")
                    .queryParam("query", "Edition")
                    .queryParam("readStatus", "READ")
                    .queryParam("sortBy", "title")
                    .queryParam("sortDir", "asc")
                    .queryParam("pageNum", 1)
                    .queryParam("pageSize", 1)
                    .build()
                    .toUri()))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content", hasSize(3)))
        .andExpect(jsonPath("$.content[0].edition", containsString("Edition")))
        .andExpect(jsonPath("$.content[0].readStatus").value("READ"))
        .andExpect(jsonPath("$.content[0].title").value("Apple"))
        .andExpect(jsonPath("$.content[1].edition", containsString("Edition")))
        .andExpect(jsonPath("$.content[1].readStatus").value("READ"))
        .andExpect(jsonPath("$.content[1].title").value("Date Date"))
        .andExpect(jsonPath("$.content[2].edition", containsString("Edition")))
        .andExpect(jsonPath("$.content[2].readStatus").value("READ"))
        .andExpect(jsonPath("$.content[2].title").value("Grape"));
  }
}
