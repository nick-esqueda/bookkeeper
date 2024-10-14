import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import TotalBooksStatCard from "./StatCards/TotalBooksStatCard";
import ReadBooksStatCard from "./StatCards/ReadBooksStatCard";
import UnreadBooksStatCard from "./StatCards/UnreadBooksStatCard";
import DidNotFinishStatCard from "./StatCards/DidNotFinishStatCard";

const CategoriesPageStatCards = ({ categoryId }) => {
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );

  if (!category) {
    return <LoadingSpinner fixed={false} />;
  }

  const {
    totalBookCount,
    readBookCount,
    unreadBookCount,
    didNotFinishBookCount,
  } = category;

  return (
    <Row>
      <TotalBooksStatCard count={totalBookCount} size={3} />
      <ReadBooksStatCard count={readBookCount} size={3} />
      <UnreadBooksStatCard count={unreadBookCount} size={3} />
      <DidNotFinishStatCard count={didNotFinishBookCount} size={3} />
    </Row>
  );
};

export default CategoriesPageStatCards;
