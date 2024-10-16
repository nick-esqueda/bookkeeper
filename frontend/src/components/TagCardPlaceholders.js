import React from "react";
import { Button, Card, Col, Placeholder, Row, Stack } from "react-bootstrap";
import {
  faBook,
  faPencil,
  faTag,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readStatusIconMap } from "../utils/dataTransformationUtils";

const TagCardPlaceholders = () => {
  const list = Array.from(Array(5));

  return (
    <Stack className="overflow-auto" style={{ maxHeight: "500px" }}>
      {list.map((_, i) => (
        <Row key={i} className="w-100">
          <Col>
            <Card body className="m-2 p-1 shadow-sm">
              <div className="d-flex justify-content-between mb-0">
                <span className="fs-5 d-flex flex-row align-items-center w-75">
                  <FontAwesomeIcon icon={faTag} className="me-3" />
                  <Placeholder animation="glow" as={"span"} className="w-100">
                    <Placeholder className="w-75" />
                  </Placeholder>
                </span>
                <span>
                  <Button variant="link" className="text-info">
                    <FontAwesomeIcon icon={faPencil} />
                  </Button>
                  <Button variant="link" className="text-danger">
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </Button>
                </span>
              </div>

              <div className="d-flex">
                <div
                  className="me-3 d-flex align-items-center"
                  style={{ minWidth: "40px" }}
                >
                  <FontAwesomeIcon
                    icon={faBook}
                    className="me-2 text-primary"
                  />
                  <Placeholder animation="glow" as={"span"} className="w-100">
                    <Placeholder className="w-100" />
                  </Placeholder>
                </div>
                <div
                  className="me-3 d-flex align-items-center"
                  style={{ minWidth: "40px" }}
                >
                  <FontAwesomeIcon
                    icon={readStatusIconMap["READ"]}
                    className="me-2 text-success"
                  />
                  <Placeholder animation="glow" as={"span"} className="w-100">
                    <Placeholder className="w-100" />
                  </Placeholder>
                </div>
                <div
                  className="me-3 d-flex align-items-center"
                  style={{ minWidth: "40px" }}
                >
                  <FontAwesomeIcon
                    icon={readStatusIconMap["UNREAD"]}
                    className="me-2 text-danger"
                  />
                  <Placeholder animation="glow" as={"span"} className="w-100">
                    <Placeholder className="w-100" />
                  </Placeholder>
                </div>
                <div
                  className="me-3 d-flex align-items-center"
                  style={{ minWidth: "40px" }}
                >
                  <FontAwesomeIcon
                    icon={readStatusIconMap["DID_NOT_FINISH"]}
                    className="me-2 text-warning"
                  />
                  <Placeholder animation="glow" as={"span"} className="w-100">
                    <Placeholder className="w-100" />
                  </Placeholder>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ))}
    </Stack>
  );
};

export default TagCardPlaceholders;
