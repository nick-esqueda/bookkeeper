class SearchFormData {
  static createDefault() {
    const instance = new SearchFormData();
    instance.query = "";
    instance.bookCategoryId = "";
    instance.readStatus = "";
    instance.sortBy = "title";
    instance.sortDir = "asc";
    return instance;
  }
}

export default SearchFormData;
