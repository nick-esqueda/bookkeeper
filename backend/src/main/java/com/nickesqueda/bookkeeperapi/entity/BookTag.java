package com.nickesqueda.bookkeeperapi.entity;

import static com.nickesqueda.bookkeeperapi.util.ValidationConstants.BOOK_TAG_NAME_MAX_SIZE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "book_tags")
@Data
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class BookTag extends BaseEntity {
  @Column(nullable = false, unique = true, length = BOOK_TAG_NAME_MAX_SIZE)
  private String name;

  @ManyToMany(mappedBy = "bookTags")
  private List<Book> books = new ArrayList<>();
}
