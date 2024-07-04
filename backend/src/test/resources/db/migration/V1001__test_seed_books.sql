-- temporarily disable foreign key checks to allow for table truncation.
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE books;
SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO books (book_category_id, title, author, edition, notes, read_status, created_at, updated_at)
VALUES
(1, "Apple", "Zack Brown", "Some Edition", "Random notes", "READ", NOW(), NOW()),
(2, "Banana Banana", "Yvonne", "Another Edition", "my notes", "UNREAD", NOW(), NOW()),
(3, "Cucumber", "Xander Xander", "Something", "My note is one sentence long.", "DID_NOT_FINISH", NOW(), NOW()),
(4, "Date Date", "Waylon", "Edition edition", null, "READ", NOW(), NOW()),
(1, "Eggplant", "Vincent Vincent Vincent", null, null, "UNREAD", NOW(), NOW()),
(2, "Fig Fig", "Ulysses", "Some Edition", "My notes", "DID_NOT_FINISH", NOW(), NOW()),
(3, "Grape", "Tyler Tyler", "Another Edition", null, "READ", NOW(), NOW()),
(4, "Horseradish Horseradish", "Sydney Sydney", null, "I am a note.", "UNREAD", NOW(), NOW());
