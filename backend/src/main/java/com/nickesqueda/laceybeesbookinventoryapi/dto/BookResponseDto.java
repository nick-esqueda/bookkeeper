package com.nickesqueda.laceybeesbookinventoryapi.dto;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class BookResponseDto {
  private int id;
  private String title;
  private String author;
  private String edition;
  private String notes;
  private ReadStatus readStatus;
  private BookCategoryResponseDto bookCategory;
  private Instant createdAt;
  private Instant updatedAt;
}
