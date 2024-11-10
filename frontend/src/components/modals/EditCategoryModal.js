import React from "react";
import { Modal } from "react-bootstrap";
import CategoryForm from "../forms/CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const EditCategoryModal = (props) => {
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
          Edit Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-creme">
        <h4>Category Name</h4>
        <p>Edit the name below and click "Save" to finish.</p>
        <CategoryForm onHide={props.onHide} category={props.category} />
      </Modal.Body>
    </Modal>
  );
};

export default EditCategoryModal;
