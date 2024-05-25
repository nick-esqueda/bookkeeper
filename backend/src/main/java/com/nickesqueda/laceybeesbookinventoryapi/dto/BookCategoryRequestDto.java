package com.nickesqueda.laceybeesbookinventoryapi.dto;

import static com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants.*;

import jakarta.validation.constraints.NotNull;
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
  @NotNull
  @Size(min = BOOK_CATEGORY_MIN_SIZE, max = BOOK_CATEGORY_MAX_SIZE)
  private String name;
}
