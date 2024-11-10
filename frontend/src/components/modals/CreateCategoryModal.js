import React from "react";
import { Modal } from "react-bootstrap";
import CategoryForm from "../forms/CategoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";

const CreateCategoryModal = (props) => {
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
          <FontAwesomeIcon icon={faLayerGroup} className="me-2" />
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-creme">
        <h5>Category Name</h5>
        <p>
          Provide a name and click "Save" to create.
          <br />
          <small className="text-muted">
            You can add books to the category after it's been created.
          </small>
        </p>
        <CategoryForm onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryModal;
