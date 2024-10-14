import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Fade, Placeholder } from "react-bootstrap";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

const StatCardPlaceholder = ({ size = 2, color = "bg-primary" }) => {
  return (
    <Col sm={size}>
      <div className={color + " stat-card text-light shadow-sm"}>
        <Placeholder animation="glow" as={"p"}>
          <Placeholder className="w-100" />
        </Placeholder>
        <div className="fs-2">
          <FontAwesomeIcon icon={faCircle} className="opacity-50" />
          <Placeholder animation="glow" as={"span"}>
            <Placeholder className="w-50 ms-4" />
          </Placeholder>
        </div>
      </div>
    </Col>
  );
};

export default StatCardPlaceholder;
