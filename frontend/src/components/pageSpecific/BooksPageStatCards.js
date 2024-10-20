import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatsAsync } from "../../features/stats/statsSlice";
import TotalBooksStatCard from "../cards/featureStats/TotalBooksStatCard";
import TotalCategoriesStatCard from "../cards/featureStats/TotalCategoriesStatCard";
import TotalTagsStatCard from "../cards/featureStats/TotalTagsStatCard";
import ReadBooksStatCard from "../cards/featureStats/ReadBooksStatCard";
import UnreadBooksStatCard from "../cards/featureStats/UnreadBooksStatCard";
import DidNotFinishStatCard from "../cards/featureStats/DidNotFinishStatCard";
import StatCardPlaceholder from "../cards/featureStats/StatCardPlaceholder";

const BookPageStatCards = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStatsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <Row>
        <StatCardPlaceholder size={2} color={"bg-primary"} />
        <StatCardPlaceholder size={2} color={"bg-info"} />
        <StatCardPlaceholder size={2} color={"bg-secondary"} />
        <StatCardPlaceholder size={2} color={"bg-success"} />
        <StatCardPlaceholder size={2} color={"bg-secondary"} />
        <StatCardPlaceholder size={2} color={"bg-secondary"} />
      </Row>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Row>
      <TotalBooksStatCard count={data.totalBookCount} />
      <TotalCategoriesStatCard count={data.totalBookCategoryCount} />
      <TotalTagsStatCard count={data.totalBookTagCount} />
      <ReadBooksStatCard count={data.readBookCount} />
      <UnreadBooksStatCard count={data.unreadBookCount} />
      <DidNotFinishStatCard count={data.didNotFinishBookCount} />
    </Row>
  );
};

export default BookPageStatCards;
