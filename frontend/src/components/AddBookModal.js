import React from "react";
import Modal from "react-bootstrap/Modal";
import BookForm from "./BookForm";

const AddBookModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Book Details</h4>
        <p>
          Fill out the details below to add to the inventory. Click save to add.
        </p>
        <BookForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default AddBookModal;
