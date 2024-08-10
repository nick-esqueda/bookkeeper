class TagFormData {
  static createFromTag(tag) {
    const instance = new TagFormData();
    instance.id = tag.id || "";
    instance.name = tag.name || "";
    return instance;
  }

  static createEmpty() {
    const instance = new TagFormData();
    instance.name = "";
    return instance;
  }
}

export default TagFormData;
