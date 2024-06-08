import React from "react";
import { Modal } from "react-bootstrap";
import CategoryForm from "./CategoryForm";

const CreateCategoryModal = (props) => {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Category Name</h4>
        <p>
          Provide a name and click "Save" to create.
          <br />
          <small className="text-muted">You can add books to the category after it's been created.</small>
        </p>
        <CategoryForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryModal;
