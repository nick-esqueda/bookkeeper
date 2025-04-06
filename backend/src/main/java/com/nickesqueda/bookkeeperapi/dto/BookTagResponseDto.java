package com.nickesqueda.bookkeeperapi.dto;

import lombok.Data;

import java.time.Instant;

@Data
public class BookTagResponseDto {
  private int id;
  private String name;
  private Instant createdAt;
  private Instant updatedAt;
  private int totalBookCount;
  private int readBookCount;
  private int unreadBookCount;
  private int didNotFinishBookCount;
  private int authorCount;
}
