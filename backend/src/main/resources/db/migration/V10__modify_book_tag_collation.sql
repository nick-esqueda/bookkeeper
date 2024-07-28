-- use "utf8_bin" collation to make string comparisons case-sensitive.
ALTER TABLE book_tags MODIFY COLUMN name VARCHAR(30) COLLATE utf8_bin;
