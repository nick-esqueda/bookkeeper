CREATE TABLE IF NOT EXISTS books_book_tags (
    book_id INT NOT NULL,
    book_tag_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (book_tag_id) REFERENCES book_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, book_tag_id)
);
