class BookFormData {
  constructor() {}

  static createFromBook(book) {
    const instance = new BookFormData();
    instance.id = book.id || "";
    instance.title = book.title || "";
    instance.author = book.author || "";
    instance.edition = book.edition || "";
    instance.readStatus = book.readStatus || "";
    instance.notes = book.notes || "";
    instance.bookCategoryId = book.bookCategory.id || "";
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
    return instance;
  }
}

export default BookFormData;
