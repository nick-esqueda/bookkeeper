-- use "utf8_bin" collation to make string comparisons case-sensitive.
ALTER TABLE book_categories MODIFY COLUMN name VARCHAR(255) COLLATE utf8_bin;
