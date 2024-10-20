import React from "react";
import { Modal } from "react-bootstrap";
import CategoryForm from "../forms/CategoryForm";

const EditCategoryModal = (props) => {
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
          Edit Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Category Name</h4>
        <p>Edit the name below and click "Save" to finish.</p>
        <CategoryForm onHide={props.onHide} category={props.category} />
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;
