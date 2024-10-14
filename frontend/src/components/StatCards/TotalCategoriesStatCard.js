import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";

const TotalCategoriesStatCard = ({ count, size = 2 }) => {
  return (
    <Col sm={size}>
      <div className="stat-card bg-info text-light shadow-sm">
        <p>Categories</p>
        <div>
          <FontAwesomeIcon icon={faLayerGroup} className="fs-1" />
          <span className="fs-2 ms-4">{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default TotalCategoriesStatCard;
