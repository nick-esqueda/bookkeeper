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
        SUM(CASE WHEN b.read_status = 'READ' THEN 1 ELSE 0 END) AS readBookCount,
        SUM(CASE WHEN b.read_status = 'UNREAD' THEN 1 ELSE 0 END) AS unreadBookCount,
        SUM(CASE WHEN b.read_status = 'DID_NOT_FINISH' THEN 1 ELSE 0 END) AS didNotFinishBookCount,
        COUNT(DISTINCT b.author) AS authorCount
      FROM book_categories bc
      LEFT JOIN books b ON bc.id = b.book_category_id
      WHERE bc.id = :bookCategoryId
      GROUP BY bc.id, bc.name, bc.created_at, bc.updated_at;
      """;

  public static final String FIND_ALL_BOOK_CATEGORIES_WITH_STATS =
      """
      SELECT
        bc.id,
        bc.name,
        bc.created_at,
        bc.updated_at,
        COUNT(*) AS totalBookCount,
        SUM(CASE WHEN b.read_status = 'READ' THEN 1 ELSE 0 END) AS readBookCount,
        SUM(CASE WHEN b.read_status = 'UNREAD' THEN 1 ELSE 0 END) AS unreadBookCount,
        SUM(CASE WHEN b.read_status = 'DID_NOT_FINISH' THEN 1 ELSE 0 END) AS didNotFinishBookCount,
        COUNT(DISTINCT b.author) AS authorCount
      FROM book_categories bc
      LEFT JOIN books b ON bc.id = b.book_category_id
      GROUP BY bc.id, bc.name, bc.created_at, bc.updated_at;
      """;

  // use CONCAT(:searchTerm, '*')) for prefix matching.
  // note: "IN BOOLEAN MODE" ignores some common words (a.k.a. stopwords)
  public static final String SEARCH_BOOKS =
      """
      SELECT *
      FROM books
      WHERE
        MATCH(title, author, edition, notes)
          AGAINST (CONCAT(:searchTerm, '*') IN BOOLEAN MODE)
        AND (:readStatus IS NULL OR read_status = :readStatus)
        AND (:bookCategoryId IS NULL OR book_category_id = :bookCategoryId)
      """;

  public static final String FIND_BOOKS =
      """
      SELECT *
      FROM books
      WHERE (:readStatus IS NULL OR read_status = :readStatus)
        AND (:bookCategoryId IS NULL OR book_category_id = :bookCategoryId)
      """;

  public static final String COUNT_DISTINCT_AUTHORS_IN_BOOK_CATEGORY =
      """
      SELECT COUNT(DISTINCT author)
      FROM books
      WHERE book_category_id = :bookCategoryId
      GROUP BY book_category_id;
      """;
}
