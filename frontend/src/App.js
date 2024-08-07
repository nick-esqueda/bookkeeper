import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import StatsPage from "./pages/StatsPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import ScrollToTop from "./components/ScrollToTop";
import TagsPage from "./pages/TagsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Container className="mt-5 pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} exact={true} />
          <Route path="/categories" element={<CategoriesPage />} exact={true} />
          <Route path="/categories/:categoryId" element={<CategoryPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:bookId" element={<BookPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
