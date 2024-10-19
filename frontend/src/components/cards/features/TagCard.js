import React, { useEffect, useState } from "react";
import { Button, Card, Fade } from "react-bootstrap";
import {
  faBook,
  faPencil,
  faTag,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { readStatusIconMap } from "../../../utils/dataTransformationUtils";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookTagAsync } from "../../../features/bookTags/bookTagsSlice";
import EditTagModal from "../../modals/EditTagModal";

const TagCard = ({ tagId }) => {
  const dispatch = useDispatch();

  const tag = useSelector((state) => state.bookTags.entities[tagId]);

  const [isMounted, setIsMounted] = useState(false);
  const [editTagModalShow, setEditTagModalShow] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  const handleDelete = async () => {
    if (!window.confirm(`Delete tag "${tag.name}"? This cannot be undone.`)) {
      return;
    }

    try {
      await dispatch(deleteBookTagAsync(tag.id));
    } catch (error) {
      alert("Uh-oh, something went wrong. Please tell Nick Bug! \n\n" + error);
    }
  };

  return (
    <Fade in={isMounted}>
      <Card body className="m-2 p-1 shadow-sm">
        <div className="d-flex justify-content-between mb-0">
          <span className="fs-5">
            <FontAwesomeIcon icon={faTag} className="me-3" />
            {tag.name}
          </span>

          <span>
            <Button
              variant="link"
              className="text-info"
              onClick={() => setEditTagModalShow(true)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
            <Button
              variant="link"
              className="text-danger"
              onClick={handleDelete}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </span>
        </div>

        <div className="d-flex">
          <div className="me-3">
            <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
            {tag.totalBookCount}
          </div>
          <div className="me-3">
            <FontAwesomeIcon
              icon={readStatusIconMap["READ"]}
              className="me-2 text-success"
            />
            {tag.readBookCount}
          </div>
          <div className="me-3">
            <FontAwesomeIcon
              icon={readStatusIconMap["UNREAD"]}
              className="me-2 text-danger"
            />
            {tag.unreadBookCount}
          </div>
          <div className="me-3">
            <FontAwesomeIcon
              icon={readStatusIconMap["DID_NOT_FINISH"]}
              className="me-2 text-warning"
            />
            {tag.didNotFinishBookCount}
          </div>
        </div>

        <EditTagModal
          show={editTagModalShow}
          onHide={() => setEditTagModalShow(false)}
          booktag={tag}
        />
      </Card>
    </Fade>
  );
};

export default TagCard;
