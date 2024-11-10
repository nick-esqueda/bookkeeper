import React from "react";
import { Modal } from "react-bootstrap";
import TagForm from "../forms/TagForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const EditTagModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        className="bg-primary text-light"
        data-bs-theme="dark"
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <FontAwesomeIcon icon={faPencil} className="me-2" />
          Edit Tag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-creme">
        <h4>Tag Name</h4>
        <p>Edit the name below and click "Save" to finish.</p>
        <TagForm onHide={props.onHide} booktag={props.booktag} />
      </Modal.Body>
    </Modal>
  );
};

export default EditTagModal;
