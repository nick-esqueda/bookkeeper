import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";
import { readStatusIconMap } from "../../utils/dataTransformationUtils";

const DidNotFinishStatCard = ({ count, size = 2 }) => {
  return (
    <Col sm={size}>
      <div className="stat-card border-warning text-warning shadow-sm">
        <p>DNF Books</p>
        <div className="fs-2">
          <FontAwesomeIcon icon={readStatusIconMap["DID_NOT_FINISH"]} />
          <span className="ms-4">{count}</span>
        </div>
      </div>
    </Col>
  );
};

export default DidNotFinishStatCard;
