package com.nickesqueda.laceybeesbookinventoryapi.dto;

import static com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants.*;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class BookRequestDto {
  @NotEmpty
  @Size(max = BOOK_TITLE_MAX_SIZE)
  private String title;

  @NotEmpty
  @Size(max = BOOK_AUTHOR_MAX_SIZE)
  private String author;

  @NotEmpty
  @Size(max = BOOK_EDITION_MAX_SIZE)
  private String edition;

  @NotEmpty
  @Size(max = BOOK_NOTES_MAX_SIZE)
  private String notes;

  @NotNull private ReadStatus readStatus;

  @NotNull private Integer bookCategoryId;
}
