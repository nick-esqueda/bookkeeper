import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookTagsAsync } from "../features/bookTags/bookTagsSlice";
import TagCard from "../components/TagCard";
import LoadingSpinner from "../components/LoadingSpinner";

const TagsPage = () => {
  const dispatch = useDispatch();

  const {
    entities: bookTags,
    ids: bookTagIds,
    loading,
    error,
  } = useSelector((state) => state.bookTags);

  const [selectedTag, setSelectedTag] = useState(bookTags[bookTagIds[0]]);

  useEffect(() => {
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

  useEffect(() => {
    // set default selectedTag on page load
    setSelectedTag(bookTags[bookTagIds[0]]);
  }, [bookTags, bookTagIds]);

  if (loading || !selectedTag) {
    return <LoadingSpinner />;
  }

  return (
    <Container style={{ height: "600px" }}>
      <Row className="mb-4">
        <h2>Manage Tags</h2>
        <p>Select a tag to see it's stats</p>
      </Row>

      <Row className="h-100">
        <Col xs={4}>
          <h3 className="fst-italic">{selectedTag.name}</h3>
          <p>Total books: {selectedTag.totalBookCount}</p>
          <p>Read books: {selectedTag.readBookCount}</p>
          <p>Unread books: {selectedTag.unreadBookCount}</p>
          <p>DNF books: {selectedTag.didNotFinishBookCount}</p>
          <p>Total authors: {selectedTag.authorCount}</p>
        </Col>
        <Col className="p-3 border-3 border-start border-light overflow-auto h-100">
          {bookTagIds.map((id) => (
            <TagCard key={id} bookTagId={id} setSelectedTag={setSelectedTag} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TagsPage;
