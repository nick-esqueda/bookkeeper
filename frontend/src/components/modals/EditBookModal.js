import React from "react";
import { Modal } from "react-bootstrap";
import BookForm from "../forms/BookForm";

const EditBookModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Book Details</h4>
        <p>Edit the details below and click "Save" to finish.</p>
        <BookForm onHide={props.onHide} book={props.book} />
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;
