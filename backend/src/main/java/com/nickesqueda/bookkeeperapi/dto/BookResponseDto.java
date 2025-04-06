package com.nickesqueda.bookkeeperapi.dto;

import com.nickesqueda.bookkeeperapi.model.ReadStatus;
import java.time.Instant;
import java.util.List;
import lombok.Data;

@Data
public class BookResponseDto {
  private int id;
  private String title;
  private String author;
  private String edition;
  private String notes;
  private ReadStatus readStatus;
  private BookCategorySimpleResponseDto bookCategory;
  private List<BookTagSimpleResponseDto> bookTags;
  private Instant createdAt;
  private Instant updatedAt;
}
