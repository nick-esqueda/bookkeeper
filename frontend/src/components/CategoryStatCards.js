import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import TotalBooksStatCard from "./StatCards/TotalBooksStatCard";
import ReadBooksStatCard from "./StatCards/ReadBooksStatCard";
import UnreadBooksStatCard from "./StatCards/UnreadBooksStatCard";
import DidNotFinishStatCard from "./StatCards/DidNotFinishStatCard";
import StatCardPlaceholder from "./StatCards/StatCardPlaceholder";

const CategoryStatCards = ({ categoryId }) => {
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );

  if (!category) {
    return (
      <Row>
        <StatCardPlaceholder size={3} color={"bg-primary"} />
        <StatCardPlaceholder size={3} color={"bg-success"} />
        <StatCardPlaceholder size={3} color={"bg-secondary"} />
        <StatCardPlaceholder size={3} color={"bg-secondary"} />
      </Row>
    );
  }

  return (
    <Row>
      <TotalBooksStatCard count={category.totalBookCount} size={3} />
      <ReadBooksStatCard count={category.readBookCount} size={3} />
      <UnreadBooksStatCard count={category.unreadBookCount} size={3} />
      <DidNotFinishStatCard count={category.didNotFinishBookCount} size={3} />
    </Row>
  );
};

export default CategoryStatCards;
