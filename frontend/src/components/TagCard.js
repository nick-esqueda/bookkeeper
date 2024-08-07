import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const TagCard = ({ bookTagId, setSelectedTag }) => {
  const bookTag = useSelector((state) => state.bookTags.entities[bookTagId]);

  if (!bookTag) {
    return null;
  }

  return (
    <Row
      className="m-3 p-3 border rounded-2"
      onClick={() => setSelectedTag(bookTag)}
    >
      <Col>
        <span>{bookTag.name}</span>
      </Col>
      <Col>(icon to edit name)</Col>
      <Col>(icon to delete)</Col>
    </Row>
  );
};

export default TagCard;
