package com.nickesqueda.laceybeesbookinventoryapi.testutils;

public final class TestConstants {
  public static final String TEST_STRING = "TEST";
  public static final String TEST_STRING2 = "TEST2";
  public static final String UNAVAILABLE_BOOK_CATEGORY = "fiction";

  public static final String CREATE_BOOK_CATEGORY_REQUEST_JSON =
      """
      {
        "name": "%s"
      }
      """
          .formatted(TEST_STRING);

  public static final String UPDATE_BOOK_CATEGORY_REQUEST_JSON =
      """
      {
        "name": "%s"
      }
      """
          .formatted(TEST_STRING2);

  public static final String UNAVAILABLE_BOOK_CATEGORY_REQUEST_JSON =
      """
      {
        "name": "%S"
      }
      """
          .formatted(UNAVAILABLE_BOOK_CATEGORY);
}
