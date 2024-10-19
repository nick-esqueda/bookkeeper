import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Placeholder, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookOpen,
  faPenNib,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const BookCardPlaceholders = () => {
  const list = Array.from(Array(6));

  return (
    <Row>
      {list.map((i) => (
        <Col key={i} xs={12} sm={6} className="mb-5">
          <Card className="h-100 border-2 border-top-0 border-bottom-0 border-end-0 shadow">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <div className="w-100">
                <FontAwesomeIcon icon={faBook} className="me-2" />
                <Placeholder animation="glow" as={"span"}>
                  <Placeholder className="w-25" />
                </Placeholder>
              </div>

              <Button variant="link">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Card.Header>

            <Card.Body className="d-flex flex-column justify-content-between">
              <div>
                <Card.Title className="mb-3">
                  <Placeholder animation="glow" as={"span"}>
                    <Placeholder className="w-75" />
                  </Placeholder>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  <Placeholder animation="glow" as={"span"}>
                    <Placeholder className="w-25" />
                  </Placeholder>
                </Card.Subtitle>
                <Card.Text className="fw-lighter fst-italic">
                  <FontAwesomeIcon
                    icon={faPenNib}
                    className="me-2 text-muted"
                  />
                  <Placeholder animation="glow" as={"span"}>
                    <Placeholder className="w-25" />
                  </Placeholder>
                </Card.Text>
              </div>

              <div className="mt-5">
                <Card.Text className="overflow-hidden position-relative">
                  <div className="one-line-hidden-scroll">
                    <Placeholder animation="glow" as={"span"}>
                      <Placeholder className="w-25 me-2" />
                    </Placeholder>
                    <Placeholder animation="glow" as={"span"}>
                      <Placeholder className="w-25 me-2" />
                    </Placeholder>
                    <Placeholder animation="glow" as={"span"}>
                      <Placeholder className="w-25 me-2" />
                    </Placeholder>
                  </div>
                </Card.Text>
                <Card.Text>
                  <Button variant="outline-primary" className="w-100">
                    <FontAwesomeIcon icon={faBookOpen} className="me-2" />
                    <Placeholder animation="glow" as={"span"}>
                      <Placeholder className="w-50 me-2" />
                    </Placeholder>
                  </Button>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookCardPlaceholders;
