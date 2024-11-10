import React from "react";
import { Modal } from "react-bootstrap";
import TagForm from "../forms/TagForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const AddTagModal = (props) => {
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
        className="bg-success text-light"
        data-bs-theme="dark"
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <FontAwesomeIcon icon={faTags} className="me-2 " />
          Create Tag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-creme">
        <h4>Tag Name</h4>
        <p>Enter the name below and click "Save" to finish.</p>
        <TagForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default AddTagModal;
