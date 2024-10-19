import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Placeholder } from "react-bootstrap";

const CategoryHeaderPlaceholder = () => {
  return (
    <div className="mt-3 mb-3 p-4 bg-secondary text-light d-flex justify-content-between flex-row shadow rounded">
      <Placeholder animation="glow" as={"span"} className="fs-2 m-3 w-50">
        <Placeholder className="w-100" />
      </Placeholder>

      <div className="mt-auto mb-auto me-3">
        <Button variant="outline-light" size="sm">
          <FontAwesomeIcon icon={faPencil} className="me-2" />
          <Placeholder
            animation="glow"
            style={{ width: "25px" }}
            className="d-inline-block"
          >
            <Placeholder className="w-100" />
          </Placeholder>
        </Button>
      </div>
    </div>
  );
};

export default CategoryHeaderPlaceholder;
