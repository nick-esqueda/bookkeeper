package com.nickesqueda.laceybeesbookinventoryapi.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Stats {
  int totalBookCount;
  int readBookCount;
  int unreadBookCount;
  int didNotFinishBookCount;
  int authorCount;
  int totalBookCategoryCount;
  int totalBookTagCount;

  // TODO
  // top X categories by book count
  // top X tags by book count
  // top 3 books by tag count
  // top 3 most read categories
  // top 3 most read authors
  // top 3 most read tags
  // top 3 books by largest notes section
  // least read category (by UNREAD, not DNF)
  // edition with the most books & count of books with that edition
}
