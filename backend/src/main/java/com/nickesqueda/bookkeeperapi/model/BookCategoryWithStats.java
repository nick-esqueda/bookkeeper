package com.nickesqueda.bookkeeperapi.model;

import java.time.Instant;

public interface BookCategoryWithStats {
  int getId();

  String getName();

  Instant getCreatedAt();

  Instant getUpdatedAt();

  int getTotalBookCount();

  int getReadBookCount();

  int getUnreadBookCount();

  int getDidNotFinishBookCount();

  int getAuthorCount();
}
