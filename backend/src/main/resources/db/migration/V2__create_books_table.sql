CREATE TABLE IF NOT EXISTS books (
    id INT NOT NULL AUTO_INCREMENT,
    book_category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    edition VARCHAR(255),
    notes VARCHAR(1500),
    read_status ENUM('READ', 'UNREAD', 'DID_NOT_FINISH') NOT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6),
    PRIMARY KEY (id),
    FOREIGN KEY (book_category_id) REFERENCES book_categories(id)
);
