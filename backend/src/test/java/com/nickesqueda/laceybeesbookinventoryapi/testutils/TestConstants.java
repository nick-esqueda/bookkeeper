package com.nickesqueda.laceybeesbookinventoryapi.testutils;

import com.nickesqueda.laceybeesbookinventoryapi.entity.Book;
import com.nickesqueda.laceybeesbookinventoryapi.entity.BookCategory;
import com.nickesqueda.laceybeesbookinventoryapi.model.ReadStatus;

import static com.nickesqueda.laceybeesbookinventoryapi.util.ValidationConstants.*;

public final class TestConstants {
  public static final String TEST_STRING = "TEST";
  public static final String TEST_STRING2 = "TEST2";
  public static final String NULL_STRING = "null";
  public static final String EMPTY_STRING = "";

  public static BookCategory fiction = new BookCategory("Fiction");
  public static BookCategory nonFiction = new BookCategory("Non-fiction");
  public static BookCategory classics = new BookCategory("Classics");
  public static BookCategory cookbooks = new BookCategory("Cookbooks");

  public static Book book1 =
      Book.builder()
          .title("Apple")
          .author("Zack Brown")
          .edition("Some Edition")
          .notes("Random notes")
          .readStatus(ReadStatus.READ)
          .bookCategory(fiction)
          .build();
  public static Book book2 =
      Book.builder()
          .title("Banana Banana")
          .author("Yvonne")
          .edition("Another Edition")
          .notes("my notes")
          .readStatus(ReadStatus.UNREAD)
          .bookCategory(nonFiction)
          .build();
  public static Book book3 =
      Book.builder()
          .title("Cucumber")
          .author("Xander Xander")
          .edition("Something")
          .notes("My note is one sentence long.")
          .readStatus(ReadStatus.DID_NOT_FINISH)
          .bookCategory(classics)
          .build();
  public static Book book4 =
      Book.builder()
          .title("Date Date")
          .author("Waylon")
          .edition("Edition edition")
          .notes(null)
          .readStatus(ReadStatus.READ)
          .bookCategory(cookbooks)
          .build();
  public static Book book5 =
      Book.builder()
          .title("Eggplant")
          .author("Vincent Vincent Vincent")
          .edition(null)
          .notes(null)
          .readStatus(ReadStatus.UNREAD)
          .bookCategory(fiction)
          .build();
  public static Book book6 =
      Book.builder()
          .title("Fig Fig")
          .author("Ulysses")
          .edition("Some Edition")
          .notes("My notes")
          .readStatus(ReadStatus.DID_NOT_FINISH)
          .bookCategory(nonFiction)
          .build();
  public static Book book7 =
      Book.builder()
          .title("Grape")
          .author("Tyler Tyler")
          .edition("Another Edition")
          .notes(null)
          .readStatus(ReadStatus.READ)
          .bookCategory(classics)
          .build();
  public static Book book8 =
      Book.builder()
          .title("Horseradish Horseradish")
          .author("Sydney Sydney")
          .edition(null)
          .notes("I am a note.")
          .readStatus(ReadStatus.UNREAD)
          .bookCategory(cookbooks)
          .build();

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

    public static final String BOOK_CATEGORY_REQUEST_UNAVAILABLE_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, UNAVAILABLE_BOOK_CATEGORY);

    public static final String BOOK_CATEGORY_REQUEST_NULL_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace("\"" + TEST_STRING + "\"", NULL_STRING);

    public static final String BOOK_CATEGORY_REQUEST_EMPTY_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, EMPTY_STRING);

    public static final String BOOK_CATEGORY_REQUEST_MAX_SIZE_NAME =
        BOOK_CATEGORY_REQUEST_JSON.replace(TEST_STRING, "a".repeat(BOOK_CATEGORY_MAX_SIZE + 1));
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

    public static final String BOOK_REQUEST_JSON =
        """
        {
          "title": %s,
          "author": %s,
          "edition": %s,
          "notes": %s,
          "readStatus": %s,
          "bookCategoryId": %s
        }
        """
            .formatted(
                "\"" + TEST_TITLE + "\"",
                "\"" + TEST_AUTHOR + "\"",
                "\"" + TEST_EDITION + "\"",
                "\"" + TEST_NOTES + "\"",
                "\"" + READ_STATUS_READ + "\"",
                TEST_BOOK_CATEGORY_ID);

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
  }
}
