package com.nickesqueda.laceybeesbookinventoryapi.entity;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants;
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
  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String author;

  @Column
  private String edition;

  @Column(length = ValidationConstants.BOOK_NOTES_MAX_SIZE)
  private String notes;

  @Column
  @Enumerated(EnumType.STRING)
  private ReadStatus readStatus;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "book_category_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private BookCategory bookCategory;
}
