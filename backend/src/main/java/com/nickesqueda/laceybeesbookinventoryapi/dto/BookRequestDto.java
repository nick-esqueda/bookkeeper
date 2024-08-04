package com.nickesqueda.laceybeesbookinventoryapi.dto;

import static com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants.*;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Data
public class BookRequestDto {
  @NotEmpty
  @Size(max = BOOK_TITLE_MAX_SIZE)
  private String title;

  @NotEmpty
  @Size(max = BOOK_AUTHOR_MAX_SIZE)
  private String author;

  @Size(max = BOOK_EDITION_MAX_SIZE)
  private String edition;

  @Size(max = BOOK_NOTES_MAX_SIZE)
  private String notes;

  @NotNull private ReadStatus readStatus;

  @NotNull private Integer bookCategoryId;

  private List<Integer> bookTagIds = new ArrayList<>();

  public void setBookTagIds(List<Integer> bookTagIds) {
    // convert explicit null values in requests to an empty list.
    this.bookTagIds = Objects.requireNonNullElseGet(bookTagIds, ArrayList::new);
  }
}
