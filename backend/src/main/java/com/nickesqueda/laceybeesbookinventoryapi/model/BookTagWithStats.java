package com.nickesqueda.laceybeesbookinventoryapi.model;

import java.time.Instant;

public interface BookTagWithStats {
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
