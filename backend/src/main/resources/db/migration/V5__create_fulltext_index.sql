-- add FULLTEXT index to enable full-text search on the specified columns.
ALTER TABLE books ADD FULLTEXT(title, author, edition, notes);
