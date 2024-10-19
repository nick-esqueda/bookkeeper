import React, { useEffect } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookTagsAsync } from "../../features/bookTags/bookTagsSlice";
import TagCardPlaceholders from "../cards/features/TagCardPlaceholders";
import TagCard from "../cards/features/TagCard";

const TagList = () => {
  const dispatch = useDispatch();

  const { ids, loading } = useSelector((state) => state.bookTags);

  useEffect(() => {
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

  if (loading) {
    return <TagCardPlaceholders />;
  }

  return (
    <Stack className="overflow-auto" style={{ maxHeight: "500px" }}>
      {ids.map((id) => (
        <Row key={id} className="w-100">
          <Col>
            <TagCard tagId={id} />
          </Col>
        </Row>
      ))}
    </Stack>
  );
};

export default TagList;
