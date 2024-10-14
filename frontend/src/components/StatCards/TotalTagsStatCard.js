import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";

const TotalTagsStatCard = ({ count, size = 2 }) => {
  return (
    <Col sm={size}>
      <div className="stat-card bg-secondary text-light shadow-sm">
        <p>Tags</p>
        <div>
          <FontAwesomeIcon icon={faTags} className="fs-1" />
          <span className="fs-2 ms-4">{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default TotalTagsStatCard;
