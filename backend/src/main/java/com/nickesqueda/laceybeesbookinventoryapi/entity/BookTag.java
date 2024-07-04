package com.nickesqueda.laceybeesbookinventoryapi.entity;

import static com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants.BOOK_TAG_NAME_MAX_SIZE;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
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
  private Set<Book> books = new HashSet<>();
}
