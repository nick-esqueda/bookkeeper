import React, { useEffect, useState } from "react";
import { Fade, Badge, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { faLayerGroup, faListOl } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CategoryCard = ({ categoryId }) => {
  const category = useSelector(
    (state) => state.bookCategories.entities[categoryId]
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    category && (
      <Fade in={isMounted}>
        <Link
          to={`/categories/${category.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card className="shadow-lg">
            <Card.Header className="text-center">
              <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
              Category
            </Card.Header>
            <Card.Body className="text-center m-5">
              <Card.Title as={"h3"}>{category.name}</Card.Title>
              <Card.Text className="d-flex justify-content-center gap-2 mt-3">
                <Badge bg="success">
                  <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
                  {category.readBookCount} Read</Badge>
                <Badge bg="primary">
                  <FontAwesomeIcon icon={faListOl} className="me-2" />
                  {category.totalBookCount} Total
                </Badge>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Fade>
    )
  );
};

export default CategoryCard;
