import React from "react";
import { Spinner } from "react-bootstrap";

const styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}

const LoadingSpinner = () => {
  return (
    <div style={styles}>
      <Spinner animation="border" size="m" />
    </div>
  );
};

export default LoadingSpinner;
