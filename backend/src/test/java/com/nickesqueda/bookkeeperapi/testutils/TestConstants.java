package com.nickesqueda.bookkeeperapi.testutils;

import static com.nickesqueda.bookkeeperapi.util.ValidationConstants.*;

public final class TestConstants {
  public static final String TEST_STRING = "TEST";
  public static final String TEST_STRING2 = "TEST2";
  public static final String NULL_STRING = "null";
  public static final String EMPTY_STRING = "";
  public static final String EMPTY_LIST = "[]";

  public static final class BookCategories {
    public static final String UNAVAILABLE_BOOK_CATEGORY = "Fiction";

    public static final String BOOK_CATEGORY_REQUEST_JSON =
        """
        {
          "name": %s
        }
        """
            .formatted("\"" + TEST_STRING + "\"");

    public static final String BOOK_CATEGORY_REQUEST_UPDATED_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, TEST_STRING2);

    public static final String BOOK_CATEGORY_REQUEST_UPDATED_CASE_FICTION =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, "fiction");

    public static final String BOOK_CATEGORY_REQUEST_UNAVAILABLE_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, UNAVAILABLE_BOOK_CATEGORY);

    public static final String BOOK_CATEGORY_REQUEST_NULL_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace("\"" + TEST_STRING + "\"", NULL_STRING);

    public static final String BOOK_CATEGORY_REQUEST_EMPTY_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, EMPTY_STRING);

    public static final String BOOK_CATEGORY_REQUEST_MAX_SIZE_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, "a".repeat(BOOK_CATEGORY_MAX_SIZE + 1));
  }

  public static final class BookTags {
    public static final String UNAVAILABLE_BOOK_TAG = "winter";

    public static final String BOOK_TAG_REQUEST_JSON =
        """
        {
          "name": %s
        }
        """
            .formatted("\"" + TEST_STRING + "\"");

    public static final String BOOK_TAG_REQUEST_UPDATED_NAME =
        BOOK_TAG_REQUEST_JSON.replace(TEST_STRING, TEST_STRING2);

    public static final String BOOK_TAG_REQUEST_UNAVAILABLE_NAME =
        BOOK_TAG_REQUEST_JSON.replace(TEST_STRING, UNAVAILABLE_BOOK_TAG);

    public static final String BOOK_TAG_REQUEST_UPDATED_CASE_AUTUMN =
        BOOK_TAG_REQUEST_JSON.replace(TEST_STRING, "Autumn");

    public static final String BOOK_TAG_REQUEST_NULL_NAME =
        BOOK_TAG_REQUEST_JSON.replace("\"" + TEST_STRING + "\"", NULL_STRING);

    public static final String BOOK_TAG_REQUEST_EMPTY_NAME =
        BOOK_TAG_REQUEST_JSON.replace(TEST_STRING, EMPTY_STRING);

    public static final String BOOK_TAG_REQUEST_MAX_SIZE_NAME =
        BOOK_TAG_REQUEST_JSON.replace(TEST_STRING, "a".repeat(BOOK_TAG_NAME_MAX_SIZE + 1));
  }

  public static final class Books {
    public static final String TEST_TITLE = "TEST_TITLE";
    public static final String TEST_AUTHOR = "TEST_AUTHOR";
    public static final String TEST_EDITION = "TEST_EDITION";
    public static final String TEST_NOTES = "TEST_NOTES";
    public static final String READ_STATUS_READ = "READ";
    public static final String READ_STATUS_UNREAD = "UNREAD";
    public static final String TEST_BOOK_CATEGORY_ID = "1";
    public static final String TEST_BOOK_CATEGORY_ID_2 = "2";
    public static final String NON_EXISTENT_BOOK_CATEGORY_ID = "1000";
    public static final String TEST_BOOK_TAG_IDS = "[1]";
    public static final String TEST_BOOK_TAG_IDS_2 = "[1, 2]";
    public static final String TEST_BOOK_TAG_IDS_WITH_NON_EXISTENT_ID = "[1, 1000]";

    public static final String BOOK_REQUEST_JSON =
        """
        {
          "title": %s,
          "author": %s,
          "edition": %s,
          "notes": %s,
          "readStatus": %s,
          "bookCategoryId": %s,
          "bookTagIds": %s
        }
        """
            .formatted(
                "\"" + TEST_TITLE + "\"",
                "\"" + TEST_AUTHOR + "\"",
                "\"" + TEST_EDITION + "\"",
                "\"" + TEST_NOTES + "\"",
                "\"" + READ_STATUS_READ + "\"",
                TEST_BOOK_CATEGORY_ID,
                TEST_BOOK_TAG_IDS);

    public static final String BOOK_REQUEST_UPDATED_TITLE =
        BOOK_REQUEST_JSON.replace(TEST_TITLE, TEST_STRING);

    public static final String BOOK_REQUEST_UPDATED_AUTHOR =
        BOOK_REQUEST_JSON.replace(TEST_AUTHOR, TEST_STRING);

    public static final String BOOK_REQUEST_UPDATED_EDITION =
        BOOK_REQUEST_JSON.replace(TEST_EDITION, TEST_STRING);

    public static final String BOOK_REQUEST_UPDATED_NOTES =
        BOOK_REQUEST_JSON.replace(TEST_NOTES, TEST_STRING);

    public static final String BOOK_REQUEST_UPDATED_READ_STATUS =
        BOOK_REQUEST_JSON.replace(READ_STATUS_READ, READ_STATUS_UNREAD);

    public static final String BOOK_REQUEST_UPDATED_CATEGORY_ID =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_CATEGORY_ID, TEST_BOOK_CATEGORY_ID_2);

    public static final String BOOK_REQUEST_UPDATED_BOOK_TAG_IDS =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_TAG_IDS, TEST_BOOK_TAG_IDS_2);

    public static final String BOOK_REQUEST_NULL_TITLE =
        BOOK_REQUEST_JSON.replace("\"" + TEST_TITLE + "\"", NULL_STRING);

    public static final String BOOK_REQUEST_NULL_AUTHOR =
        BOOK_REQUEST_JSON.replace("\"" + TEST_AUTHOR + "\"", NULL_STRING);

    public static final String BOOK_REQUEST_NULL_EDITION =
        BOOK_REQUEST_JSON.replace("\"" + TEST_EDITION + "\"", NULL_STRING);

    public static final String BOOK_REQUEST_NULL_NOTES =
        BOOK_REQUEST_JSON.replace("\"" + TEST_NOTES + "\"", NULL_STRING);

    public static final String BOOK_REQUEST_NULL_READ_STATUS =
        BOOK_REQUEST_JSON.replace("\"" + READ_STATUS_READ + "\"", NULL_STRING);

    public static final String BOOK_REQUEST_NULL_BOOK_CATEGORY_ID =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_CATEGORY_ID, NULL_STRING);

    public static final String BOOK_REQUEST_NULL_BOOK_TAG_IDS =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_TAG_IDS, NULL_STRING);

    public static final String BOOK_REQUEST_EMPTY_TITLE =
        BOOK_REQUEST_JSON.replace(TEST_TITLE, EMPTY_STRING);

    public static final String BOOK_REQUEST_EMPTY_AUTHOR =
        BOOK_REQUEST_JSON.replace(TEST_AUTHOR, EMPTY_STRING);

    public static final String BOOK_REQUEST_EMPTY_EDITION =
        BOOK_REQUEST_JSON.replace(TEST_EDITION, EMPTY_STRING);

    public static final String BOOK_REQUEST_EMPTY_NOTES =
        BOOK_REQUEST_JSON.replace(TEST_NOTES, EMPTY_STRING);

    public static final String BOOK_REQUEST_EMPTY_READ_STATUS =
        BOOK_REQUEST_JSON.replace(READ_STATUS_READ, EMPTY_STRING);

    public static final String BOOK_REQUEST_EMPTY_BOOK_TAG_IDS =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_TAG_IDS, EMPTY_LIST);

    public static final String BOOK_REQUEST_MAX_SIZE_TITLE =
        BOOK_REQUEST_JSON.replace(TEST_TITLE, "a".repeat(BOOK_TITLE_MAX_SIZE + 1));

    public static final String BOOK_REQUEST_MAX_SIZE_AUTHOR =
        BOOK_REQUEST_JSON.replace(TEST_AUTHOR, "a".repeat(BOOK_AUTHOR_MAX_SIZE + 1));

    public static final String BOOK_REQUEST_MAX_SIZE_EDITION =
        BOOK_REQUEST_JSON.replace(TEST_EDITION, "a".repeat(BOOK_EDITION_MAX_SIZE + 1));

    public static final String BOOK_REQUEST_MAX_SIZE_NOTES =
        BOOK_REQUEST_JSON.replace(TEST_NOTES, "a".repeat(BOOK_NOTES_MAX_SIZE + 1));

    public static final String BOOK_REQUEST_INVALID_READ_STATUS =
        BOOK_REQUEST_JSON.replace(READ_STATUS_READ, TEST_STRING);

    public static final String BOOK_REQUEST_NON_EXISTENT_BOOK_CATEGORY_ID =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_CATEGORY_ID, NON_EXISTENT_BOOK_CATEGORY_ID);

    public static final String BOOK_REQUEST_MIXED_EXISTENCE_BOOK_TAG_IDS =
        BOOK_REQUEST_JSON.replace(TEST_BOOK_TAG_IDS, TEST_BOOK_TAG_IDS_WITH_NON_EXISTENT_ID);
  }
}
