import React, { useEffect, useState } from "react";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Fade } from "react-bootstrap";
import { useSelector } from "react-redux";
import EditCategoryModal from "../modals/EditCategoryModal";
import CategoryHeaderPlaceholder from "../pageSpecific/CategoryHeaderPlaceholder";

const CategoryHeader = ({ categoryId }) => {
  const { entities, loading } = useSelector((state) => state.bookCategories);
  const category = entities[categoryId];

  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // control the Fade component to fade the Card in.
    setIsMounted(true);
  }, []);

  if (loading || !category) {
    return <CategoryHeaderPlaceholder />;
  }

  return (
    <Fade in={isMounted}>
      <div className="mt-3 mb-3 p-4 bg-secondary text-light d-flex justify-content-between flex-row shadow rounded">
        <EditCategoryModal
          show={showEditCategoryModal}
          onHide={() => setShowEditCategoryModal(false)}
          category={category}
        />
        <span className="fs-2 m-3">{category.name}</span>
        <div className="mt-auto mb-auto me-3">
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => setShowEditCategoryModal(true)}
          >
            <FontAwesomeIcon icon={faPencil} className="me-2" />
            Edit
          </Button>
        </div>
      </div>
    </Fade>
  );
};

export default CategoryHeader;
