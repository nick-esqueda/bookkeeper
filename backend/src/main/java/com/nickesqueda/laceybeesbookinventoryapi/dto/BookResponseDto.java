package com.nickesqueda.laceybeesbookinventoryapi.dto;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import lombok.Data;

@Data
public class BookResponseDto {
  private int id;
  private int bookCategoryId;
  private String title;
  private String author;
  private String edition;
  private String notes;
  private ReadStatus readStatus;
}
