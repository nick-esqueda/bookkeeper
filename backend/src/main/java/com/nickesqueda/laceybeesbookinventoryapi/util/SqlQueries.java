package com.nickesqueda.laceybeesbookinventoryapi.util;

public final class SqlQueries {
  public static final String FIND_BOOK_CATEGORY_WITH_STATS =
      """
      SELECT
        bc.id,
        bc.name,
        bc.created_at,
        bc.updated_at,
        COUNT(*) AS totalBookCount,
        SUM(CASE WHEN b.read_status = 'READ' THEN 1 ELSE 0 END) AS readBookCount
      FROM book_categories bc
      JOIN books b ON bc.id = b.book_category_id
      WHERE bc.id = :bookCategoryId
      GROUP BY bc.id;
      """;
}
