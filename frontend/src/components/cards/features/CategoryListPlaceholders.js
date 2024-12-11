import React from "react";
import { Stack, Placeholder } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const CategoryListPlaceholders = () => {
  const style = "p-3 border-bottom border-2 text-dark text-decoration-none";
  const list = Array.from(Array(4));
  return (
    <Stack>
      {list.map((_, i) => (
        <Link key={i} className={style}>
          <FontAwesomeIcon icon={faLayerGroup} className="me-3" />
          <Placeholder animation="glow" as={"span"}>
            <Placeholder className="fs-5 w-75" />
          </Placeholder>
        </Link>
      ))}
    </Stack>
  );
};

export default CategoryListPlaceholders;
