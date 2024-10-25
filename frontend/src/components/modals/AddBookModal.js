import React from "react";
import Modal from "react-bootstrap/Modal";
import BookForm from "../forms/BookForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddBookModal = (props) => {
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
        className="bg-success text-light btn-close-white"
        data-bs-theme="dark"
      >
        <Modal.Title id="contained-modal-title-vcenter">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Book
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-creme">
        <div className="p-3">
          <h4>Book Details</h4>
          <p>
            Fill out the details below and click "Save" to add to the inventory.
          </p>
          <BookForm onHide={props.onHide} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddBookModal;
