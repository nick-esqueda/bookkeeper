import React, { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookCategoriesAsync } from "../features/bookCategories/bookCategoriesSlice";
import LoadingSpinner from "./LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CategoryList = ({ activeCategoryId }) => {
  const dispatch = useDispatch();

  const { ids, entities, loading, error } = useSelector(
    (state) => state.bookCategories
  );

  useEffect(() => {
    dispatch(fetchBookCategoriesAsync());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner fixed={false} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Stack>
      {ids.map((id) => {
        const defaultStyle =
          "p-3 border-bottom border-2 text-dark text-decoration-none";
        const finalStyle =
          id == activeCategoryId ? defaultStyle + " tab-active" : defaultStyle;

        return (
          <Link key={id} to={`/categories/${id}`} className={finalStyle}>
            <FontAwesomeIcon icon={faLayerGroup} className="me-3" />
            <span className="fs-5">{entities[id].name}</span>
          </Link>
        );
      })}
    </Stack>
  );
};

export default CategoryList;
