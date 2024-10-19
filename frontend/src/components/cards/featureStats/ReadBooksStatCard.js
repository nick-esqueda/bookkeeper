import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Fade } from "react-bootstrap";
import { readStatusIconMap } from "../../../utils/dataTransformationUtils";

const ReadBooksStatCard = ({ count, size = 2 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  return (
    <Fade in={isMounted}>
      <Col sm={size}>
        <div className="stat-card bg-success text-light shadow-sm">
          <p>Read Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["READ"]} />
            <span className="ms-4">{count}</span>
          </div>
        </div>
      </Col>
    </Fade>
  );
};

export default ReadBooksStatCard;
