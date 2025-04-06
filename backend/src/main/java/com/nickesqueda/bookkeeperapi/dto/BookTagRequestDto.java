package com.nickesqueda.bookkeeperapi.dto;

import static com.nickesqueda.bookkeeperapi.util.ValidationConstants.BOOK_TAG_NAME_MAX_SIZE;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookTagRequestDto {
  @NotBlank
  @Size(max = BOOK_TAG_NAME_MAX_SIZE)
  private String name;
}
