import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddBookModal from "../components/AddBookModal";
import CreateCategoryModal from "../components/CreateCategoryModal";

const HomePage = () => {
  const [addBookModalShow, setAddBookModalShow] = useState(false);
  const [createCategoryModalShow, setCreateCategoryModalShow] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <h1 id="homepage-brand">
            Lacey Bee's
            <br />
            Book Inventory
          </h1>
        </Col>
      </Row>
      <Row className="p-4 justify-content-center">
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Add Books</Card.Title>
              <Card.Text>
                To add a book to the inventory, click "Add Book" in the top
                right at any time. Fill out the form and click "Save" to store
                it in your database.
              </Card.Text>
              <Card.Text>
                If you want to edit or delete a book from the inventory, visit
                the book's page. From there, you can edit notes, change
                categories, and more.
              </Card.Text>
              <Card.Text>
                <Button onClick={() => setAddBookModalShow(true)}>
                  Add Book
                </Button>
                <AddBookModal
                  show={addBookModalShow}
                  onHide={() => setAddBookModalShow(false)}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Book Categories</Card.Title>
              <Card.Text>
                Books can be categorized however you desire. Create new
                categories, edit names for existing categories, and move books
                from one category to another.
              </Card.Text>
              <Card.Text>
                Put books in a category while adding a book, or change an
                existing book's category by clicking "Edit Book" on the book's
                page.
              </Card.Text>
              <Card.Text>
                <Button as={Link} to="/categories">
                  See Categories
                </Button>
                <Button
                  variant="link"
                  onClick={() => setCreateCategoryModalShow(true)}
                >
                  Create Category
                </Button>
                <CreateCategoryModal
                  show={createCategoryModalShow}
                  onHide={() => setCreateCategoryModalShow(false)}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Search</Card.Title>
              <Card.Text>
                Search for books in the inventory by going to the books page.
                You can filter by category and read status, and also sort
                results by different fields.
              </Card.Text>
              <Card.Text>
                The search tool is a good way to see how many books are in each
                category, how many books you've read, and so on.
              </Card.Text>
              <Card.Text>
                <Button as={Link} to="/books">
                  Search Books
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
