INSERT INTO books_book_tags (book_id, book_tag_id, created_at, updated_at)
VALUES
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(2, 3, NOW(), NOW()),
(3, 1, NOW(), NOW()),
(3, 2, NOW(), NOW()),
(3, 3, NOW(), NOW()),
(4, 1, NOW(), NOW()),
(4, 2, NOW(), NOW()),
(5, 1, NOW(), NOW()),
(7, 1, NOW(), NOW()),
(8, 1, NOW(), NOW()),
(8, 2, NOW(), NOW());

-- Book 1: 1 tag
-- Book 2: 2 tags
-- Book 3: 3 tags
-- Book 4: 2 tags
-- Book 5: 1 tag
-- Book 6: 0 tags
-- Book 7: 1 tags
-- Book 8: 2 tags

-- Tag 1: 6 books
-- Tag 2: 4 books
-- Tag 3: 2 books
