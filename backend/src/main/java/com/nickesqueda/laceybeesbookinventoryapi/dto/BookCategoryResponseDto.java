package com.nickesqueda.laceybeesbookinventoryapi.dto;

import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class BookCategoryResponseDto {
  private int id;
  private String name;
  private int totalBookCount;
  private int readBookCount;
  private Instant createdAt;
  private Instant updatedAt;
}
