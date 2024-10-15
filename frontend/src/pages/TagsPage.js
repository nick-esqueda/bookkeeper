import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddTagModal from "../components/AddTagModal";
import TagList from "../components/TagList";
import TagPageStatCards from "../components/TagPageStatCards";

const TagsPage = () => {
  const [createTagModalShow, setCreateTagModalShow] = useState(false);

  return (
    <Container className="mt-5" style={{ height: "600px" }}>
      <Row className="mb-4">
        <Col>
          <h2>Manage Tags</h2>
        </Col>
      </Row>

      <Row className="h-100">
        <Col xs={6}>
          <div className="island">
            <h4>Edit or Delete Tags</h4>
            <p>
              Stats at the bottom of each tag show the number of books with that
              tag (Total, Read, Unread, DNF)
            </p>
            <TagList />
          </div>
        </Col>

        <Col xs={6}>
          <div className="island">
            <h4 className="mb-3">Create a Tag</h4>
            <Button
              variant="outline-primary"
              onClick={() => setCreateTagModalShow(true)}
            >
              <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
              Add Tag
            </Button>
          </div>
          <div className="island">
            <TagPageStatCards />
          </div>
        </Col>
      </Row>

      <AddTagModal
        show={createTagModalShow}
        onHide={() => setCreateTagModalShow(false)}
      />
    </Container>
  );
};

export default TagsPage;
