import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Fade } from "react-bootstrap";

const TotalCategoriesStatCard = ({ count, size = 2 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  return (
    <Fade in={isMounted}>
      <Col sm={size}>
        <div className="stat-card bg-info text-light shadow-sm">
          <p>Categories</p>
          <div>
            <FontAwesomeIcon icon={faLayerGroup} className="fs-1" />
            <span className="fs-2 ms-4">{count}</span>
          </div>
        </div>
      </Col>
    </Fade>
  );
};

export default TotalCategoriesStatCard;
