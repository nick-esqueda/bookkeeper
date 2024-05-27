import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryCard = ({ categoryId }) => {
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );

  return (
    <Link
      to={`/categories/${category.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card>
        <Card.Header>Category</Card.Header>
        <Card.Body>
          <Card.Title as={"h3"}>{category.name}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <Card.Text>Total Books: 7</Card.Text>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default CategoryCard;
