package com.nickesqueda.bookkeeperapi.dto;

import static com.nickesqueda.bookkeeperapi.util.ValidationConstants.*;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class BookCategoryRequestDto {
  @NotBlank
  @Size(max = BOOK_CATEGORY_MAX_SIZE)
  private String name;
}
