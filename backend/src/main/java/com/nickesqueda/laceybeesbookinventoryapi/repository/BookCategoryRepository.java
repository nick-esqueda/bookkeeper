package com.nickesqueda.laceybeesbookinventoryapi.repository;

import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCategoryRepository extends JpaRepository<BookCategory, Integer> {}
