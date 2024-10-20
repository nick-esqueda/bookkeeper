import { faBook, faEllipsis, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card, Placeholder, Row } from "react-bootstrap";

const BookCardCompactPlaceholders = () => {
  const list = Array.from(Array(5));

  return (
    <Row>
      {list.map((_, i) => (
        <Card key={i} className="mb-2 mt-2 p-3 flex-row shadow-sm">
          <div className="pt-2 me-4">
            <FontAwesomeIcon icon={faBook} className="fs-4" />
          </div>
          <div className="w-100">
            <div className="fs-5 me-4 mb-1">
              <Placeholder animation="glow" as={"span"}>
                <Placeholder className="w-50" />
              </Placeholder>
            </div>
            <div className="fst-italic text-muted">
              <FontAwesomeIcon icon={faUser} className="fs-6 me-2" />
              <Placeholder animation="glow" as={"span"}>
                <Placeholder className="w-25" />
              </Placeholder>
            </div>
          </div>
          <Button variant="link" className="ms-auto m-2">
            <FontAwesomeIcon icon={faEllipsis} />
          </Button>
        </Card>
      ))}
    </Row>
  );
};

export default BookCardCompactPlaceholders;
