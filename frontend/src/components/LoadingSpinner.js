import React from "react";
import { Spinner } from "react-bootstrap";

const fixedStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const fitStyles = {};

const LoadingSpinner = ({ fixed = true, size = "" }) => {
  return (
    <div
      style={fixed ? fixedStyles : fitStyles}
      className="h-100 d-flex align-items-center justify-content-center"
    >
      <Spinner animation="border" size={size} />
    </div>
  );
};

export default LoadingSpinner;
