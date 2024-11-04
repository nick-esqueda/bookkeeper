import React from "react";
import { Modal } from "react-bootstrap";
import BookForm from "../forms/BookForm";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditBookModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
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
          Edit Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-creme">
        <div className="p-3">
          <h4>Book Details</h4>
          <p>Edit the details below and click "Save" to finish.</p>
          <BookForm onHide={props.onHide} book={props.book} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;
