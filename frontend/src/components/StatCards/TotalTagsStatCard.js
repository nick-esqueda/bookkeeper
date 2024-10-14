import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Fade } from "react-bootstrap";

const TotalTagsStatCard = ({ count, size = 2 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  return (
    <Fade in={isMounted}>
      <Col sm={size}>
        <div className="stat-card bg-secondary text-light shadow-sm">
          <p>Tags</p>
          <div>
            <FontAwesomeIcon icon={faTags} className="fs-1" />
            <span className="fs-2 ms-4">{count}</span>
          </div>
        </div>
      </Col>
    </Fade>
  );
};

export default TotalTagsStatCard;
