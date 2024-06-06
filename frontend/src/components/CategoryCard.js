import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CategoryCard = ({ categoryId }) => {
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );

  return (
    <Link to={`/categories/${category.id}`} style={{ textDecoration: "none" }}>
      <Card className="shadow-lg">
        <Card.Header className="text-center">Category</Card.Header>
        <Card.Body>
          <Card.Title as={"h3"} className="text-center m-5">
            {category.name}
          </Card.Title>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CategoryCard;
