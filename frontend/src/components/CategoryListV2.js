import React, { useEffect } from "react";
import { Stack, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const CategoryListV2 = ({ activeCategoryId, setActiveCategoryId }) => {
  const dispatch = useDispatch();

  const { ids, entities, loading, error } = useSelector(
    (state) => state.bookCategories
  );

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, []);

  useEffect(() => {
    // once categories are loaded in, set the first category as active
    if (ids.length) {
      setActiveCategoryId(entities[ids[0]].id);
    }
  }, [ids]);

  if (loading) {
    return <LoadingSpinner fixed={false} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Stack>
      {ids.map((id) => {
        return (
          <div
            className={
              id === activeCategoryId
                ? "p-3 border-bottom border-2 tab-active"
                : "p-3 border-bottom border-2"
            }
            key={id}
            onClick={() => setActiveCategoryId(id)}
          >
            <FontAwesomeIcon icon={faLayerGroup} className="me-3" />
            <span className="fs-5">{entities[id].name}</span>
          </div>
        );
      })}
    </Stack>
  );
};

export default CategoryListV2;
