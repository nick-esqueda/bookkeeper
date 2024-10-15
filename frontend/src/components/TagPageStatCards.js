import React, { useEffect } from "react";
import TotalTagsStatCard from "./StatCards/TotalTagsStatCard";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookTagsAsync } from "../features/bookTags/bookTagsSlice";
import StatCardPlaceholder from "./StatCards/StatCardPlaceholder";
import MostReadTagStatCard from "./StatCards/MostReadTagStatCard";
import MostBooksTagStatCard from "./StatCards/MostBooksTagStatCard";
import MostStartedTagStatCard from "./StatCards/MostStartedTagStatCard";

const TagPageStatCards = () => {
  const dispatch = useDispatch();

  const {
    ids: tagIds,
    entities: tags,
    loading,
  } = useSelector((state) => state.bookTags);

  useEffect(() => {
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <Row>
        <StatCardPlaceholder size={4} color="bg-secondary" />
        <StatCardPlaceholder size={8} color="bg-success" />
        <StatCardPlaceholder size={4} color="bg-info" />
        <StatCardPlaceholder size={8} color="bg-secondary" />
      </Row>
    );
  }

  const mostReadTag = tagIds.reduce(
    (prevTag, tagId) => {
      const tag = tags[tagId];
      if (tag.readBookCount > prevTag.readBookCount) {
        return tag;
      }
      return prevTag;
    },
    { readBookCount: 0 }
  );

  const mostBooksTag = tagIds.reduce(
    (prevTag, tagId) => {
      const tag = tags[tagId];
      if (tag.totalBookCount > prevTag.totalBookCount) {
        return tag;
      }
      return prevTag;
    },
    { totalBookCount: 0 }
  );

  const mostStartedTag = tagIds.reduce(
    (prevTag, tagId) => {
      const tag = tags[tagId];
      if (tag.didNotFinishBookCount > prevTag.didNotFinishBookCount) {
        return tag;
      }
      return prevTag;
    },
    { didNotFinishBookCount: 0 }
  );

  return (
    <Row>
      <TotalTagsStatCard count={tagIds.length} size={4} />
      <MostReadTagStatCard name={mostReadTag.name} size={8} />
      <MostBooksTagStatCard count={mostBooksTag.totalBookCount} size={4} />
      <MostStartedTagStatCard name={mostStartedTag.name} size={8} />
    </Row>
  );
};

export default TagPageStatCards;
