import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBookTagAsync,
  fetchBookTagsAsync,
} from "../features/bookTags/bookTagsSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleHalfStroke,
  faCircleNotch,
  faCirclePlus,
  faListOl,
  faPencil,
  faTag,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import EditTagModal from "../components/EditTagModal";
import AddTagModal from "../components/AddTagModal";

const TagsPage = () => {
  const dispatch = useDispatch();

  const {
    entities: bookTags,
    ids: bookTagIds,
    loading,
  } = useSelector((state) => state.bookTags);

  const [selectedTag, setSelectedTag] = useState(bookTags[bookTagIds[0]]);
  const [editTagModalShow, setEditTagModalShow] = useState(false);
  const [createTagModalShow, setCreateTagModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchBookTagsAsync());
  }, [dispatch]);

  useEffect(() => {
    // set default selectedTag on page load
    setSelectedTag(bookTags[bookTagIds[0]]);
  }, [bookTags, bookTagIds]);

  if (loading || !selectedTag) {
    return <LoadingSpinner />;
  }

  const handleDelete = async () => {
    if (
      !window.confirm(`Delete "${selectedTag.name}"? This cannot be undone.`)
    ) {
      return;
    }

    try {
      await dispatch(deleteBookTagAsync(selectedTag.id));
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  return (
    <Container className="mt-4" style={{ height: "600px" }}>
      <Row className="mb-4">
        <Col>
          <h2>Manage Tags</h2>
          <p>Select a tag to see it's stats</p>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-primary"
            onClick={() => setCreateTagModalShow(true)}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="me-2" />
            Add Tag
          </Button>
        </Col>
      </Row>

      <Row className="h-100">
        <Col xs={4}>
          <h3 className="fst-italic mt-4 mb-4">
            <FontAwesomeIcon icon={faTag} className="me-3" />
            {selectedTag.name}
          </h3>
          <div className="mb-5">
            <Button
              variant="outline-info"
              className="me-2"
              onClick={() => setEditTagModalShow(true)}
            >
              <FontAwesomeIcon icon={faPencil} className="me-2" />
              Edit Tag
            </Button>
            <Button variant="outline-danger" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Delete Tag
            </Button>
          </div>
          <div className="fs-5">
            <h4 className="mb-3">Tag Stats</h4>
            <Badge bg="success" className="mb-3 me-3">
              <FontAwesomeIcon icon={faCircleCheck} className="me-2" />
              {selectedTag.readBookCount} Read
            </Badge>
            <Badge bg="danger" className="mb-3 me-3">
              <FontAwesomeIcon icon={faCircleNotch} className="me-2" />
              {selectedTag.unreadBookCount} Unread
            </Badge>
            <Badge bg="warning" className="mb-3 me-3 text-dark">
              <FontAwesomeIcon icon={faCircleHalfStroke} className="me-2" />
              {selectedTag.didNotFinishBookCount} DNF
            </Badge>
            <Badge bg="primary" className="mb-3 me-3">
              <FontAwesomeIcon icon={faListOl} className="me-2" />
              {selectedTag.totalBookCount} Total
            </Badge>
            <Badge bg="secondary" className="mb-3 me-3">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {selectedTag.authorCount}{" "}
              {selectedTag.authorCount === 1 ? "Author" : "Authors"}
            </Badge>
          </div>
        </Col>

        <Col className="p-3 border-3 border-start border-light overflow-auto h-100">
          <Row>
            {bookTagIds.map((id) => (
              <Col md="auto" key={id}>
                <Button
                  variant={
                    id === selectedTag.id ? "primary" : "outline-primary"
                  }
                  className="m-3 fs-6"
                  onClick={() => setSelectedTag(bookTags[id])}
                >
                  <FontAwesomeIcon icon={faTag} className="me-2" />
                  {bookTags[id].name}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <EditTagModal
        show={editTagModalShow}
        onHide={() => setEditTagModalShow(false)}
        booktag={selectedTag}
      />
      <AddTagModal
        show={createTagModalShow}
        onHide={() => setCreateTagModalShow(false)}
      />
    </Container>
  );
};

export default TagsPage;
