package com.nickesqueda.laceybeesbookinventoryapi.entity;

import static com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants.*;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "books")
@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Book extends BaseEntity {
  @Column(nullable = false, length = BOOK_TITLE_MAX_SIZE)
  private String title;

  @Column(nullable = false, length = BOOK_AUTHOR_MAX_SIZE)
  private String author;

  @Column(length = BOOK_EDITION_MAX_SIZE)
  private String edition;

  @Column(length = BOOK_NOTES_MAX_SIZE)
  private String notes;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private ReadStatus readStatus;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "book_category_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private BookCategory bookCategory;
}
