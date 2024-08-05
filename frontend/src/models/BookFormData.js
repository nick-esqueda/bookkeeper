class BookFormData {
  static createFromBook(book) {
    const instance = new BookFormData();
    instance.id = book.id || "";
    instance.title = book.title || "";
    instance.author = book.author || "";
    instance.edition = book.edition || "";
    instance.readStatus = book.readStatus || "";
    instance.notes = book.notes || "";
    instance.bookCategoryId = book.bookCategory.id || "";
    instance.bookTagIds = book.bookTags.map((bookTag) => bookTag.id);
    return instance;
  }

  static createEmpty() {
    const instance = new BookFormData();
    instance.title = "";
    instance.author = "";
    instance.edition = "";
    instance.readStatus = "";
    instance.notes = "";
    instance.bookCategoryId = "";
    instance.bookTagIds = [];
    return instance;
  }
}

export default BookFormData;
