package com.nickesqueda.laceybeesbookinventoryapi.model;

import java.time.Instant;

public interface BookCategoryWithStats {
  int getId();

  String getName();

  Instant getCreatedAt();

  Instant getUpdatedAt();

  int getTotalBookCount();

  int getReadBookCount();
}
