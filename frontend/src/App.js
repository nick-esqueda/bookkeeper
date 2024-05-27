import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import StatsPage from "./pages/StatsPage";
import Header from "./components/Header";
import { Container } from "react-bootstrap";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container className="mt-5 pt-5">
        <Routes>
          <Route path="/categories" element={<CategoriesPage />} exact={true} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:bookId" element={<BookPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
