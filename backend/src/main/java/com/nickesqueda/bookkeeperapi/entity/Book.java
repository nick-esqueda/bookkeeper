package com.nickesqueda.bookkeeperapi.entity;

import static com.nickesqueda.bookkeeperapi.util.ValidationConstants.*;

import com.nickesqueda.bookkeeperapi.model.ReadStatus;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "books")
@Data
@ToString(callSuper = true)
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

  @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
      name = "books_book_tags",
      joinColumns = @JoinColumn(name = "book_id"),
      inverseJoinColumns = @JoinColumn(name = "book_tag_id"))
  private List<BookTag> bookTags = new ArrayList<>();
}
