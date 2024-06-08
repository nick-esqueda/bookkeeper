class CategoryFormData {
  static createFromCategory(book) {
    const instance = new CategoryFormData();
    instance.id = book.id || "";
    instance.name = book.name || "";
    return instance;
  }

  static createEmpty() {
    const instance = new CategoryFormData();
    instance.name = "";
    return instance;
  }
}

export default CategoryFormData;
