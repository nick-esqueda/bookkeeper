import {
  faBook,
  faLayerGroup,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import { fetchStatsAsync } from "../features/stats/statsSlice";
import { readStatusIconMap } from "../utils/dataTransformationUtils";

const StatCards = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchStatsAsync());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner fixed={false} />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Row>
      <Col sm={2}>
        <div className="stat-card bg-primary text-light shadow-sm">
          <p>Total Books</p>
          <div>
            <FontAwesomeIcon icon={faBook} className="fs-1" />
            <span className="fs-2 ms-4">{data.totalBookCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={2}>
        <div className="stat-card bg-info text-light shadow-sm">
          <p>Categories</p>
          <div>
            <FontAwesomeIcon icon={faLayerGroup} className="fs-1" />
            <span className="fs-2 ms-4">{data.totalBookCategoryCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={2}>
        <div className="stat-card bg-secondary text-light shadow-sm">
          <p>Tags</p>
          <div>
            <FontAwesomeIcon icon={faTags} className="fs-1" />
            <span className="fs-2 ms-4">{data.totalBookTagCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={2}>
        <div className="stat-card bg-success text-white shadow-sm">
          <p>Read Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["READ"]} />
            <span className="ms-4">{data.readBookCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={2}>
        <div className="stat-card border-danger text-danger shadow-sm">
          <p>Unread Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["UNREAD"]} />
            <span className="ms-4">{data.unreadBookCount}</span>
          </div>
        </div>
      </Col>
      <Col sm={2}>
        <div className="stat-card border-warning text-warning shadow-sm">
          <p>DNF Books</p>
          <div className="fs-2">
            <FontAwesomeIcon icon={readStatusIconMap["DID_NOT_FINISH"]} />
            <span className="ms-4">{data.didNotFinishBookCount}</span>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default StatCards;
