import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Fade } from "react-bootstrap";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const MostBooksTagStatCard = ({ count, size = 2 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  return (
    <Fade in={isMounted}>
      <Col sm={size}>
        <div className="stat-card bg-info text-light shadow-sm">
          <p>Most Books</p>
          <div>
            <FontAwesomeIcon icon={faBook} className="fs-1 me-4" />
            <span className="fs-2">{count}</span>
          </div>
        </div>
      </Col>
    </Fade>
  );
};

export default MostBooksTagStatCard;
