import React from "react";
import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TotalBooksStatCard from "../cards/featureStats/TotalBooksStatCard";
import ReadBooksStatCard from "../cards/featureStats/ReadBooksStatCard";
import UnreadBooksStatCard from "../cards/featureStats/UnreadBooksStatCard";
import DidNotFinishStatCard from "../cards/featureStats/DidNotFinishStatCard";
import StatCardPlaceholder from "../cards/featureStats/StatCardPlaceholder";

const CategoryPageStatCards = ({ categoryId }) => {
  const { entities, loading } = useSelector((state) => state.bookCategories);
  const category = entities[categoryId];

  if (loading || !category) {
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

export default CategoryPageStatCards;
