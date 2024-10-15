import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Fade } from "react-bootstrap";
import { readStatusIconMap } from "../../utils/dataTransformationUtils";

const MostStartedTagStatCard = ({ name, size = 2 }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  return (
    <Fade in={isMounted}>
      <Col sm={size}>
        <div className="stat-card border-warning text-warning shadow-sm">
          <p>Most In Progress</p>
          <div className="d-flex">
            <FontAwesomeIcon
              icon={readStatusIconMap["DID_NOT_FINISH"]}
              className="fs-1 me-4"
            />
            <span className="fs-2 text-truncate">{name}</span>
          </div>
        </div>
      </Col>
    </Fade>
  );
};

export default MostStartedTagStatCard;
