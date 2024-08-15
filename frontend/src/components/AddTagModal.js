import React from "react";
import { Modal } from "react-bootstrap";
import TagForm from "./TagForm";

const AddTagModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Create Tag</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Tag Name</h4>
        <p>Enter the name below and click "Save" to finish.</p>
        <TagForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default AddTagModal;
