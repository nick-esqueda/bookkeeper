package com.nickesqueda.laceybeesbookinventoryapi.repository;

import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;
import com.nickesqueda.laceybeesbookinventoryapi.model.Stats;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class StatsRepository {

  private final JdbcTemplate jdbcTemplate;
  private final BookRepository bookRepository;
  private final BookCategoryRepository bookCategoryRepository;
  private final BookTagRepository bookTagRepository;

  public Stats getStats() {
    return Stats.builder()
        .totalBookCount((int) bookRepository.count())
        .totalBookCategoryCount((int) bookCategoryRepository.count())
        .totalBookTagCount((int) bookTagRepository.count())
        .readBookCount(bookRepository.countByReadStatus(ReadStatus.READ))
        .unreadBookCount(bookRepository.countByReadStatus(ReadStatus.UNREAD))
        .didNotFinishBookCount(bookRepository.countByReadStatus(ReadStatus.DID_NOT_FINISH))
        .authorCount(bookRepository.countAuthors())
        .build();
  }
}
