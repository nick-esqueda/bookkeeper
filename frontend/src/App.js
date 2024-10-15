import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import StatsPage from "./pages/StatsPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import ScrollToTop from "./components/ScrollToTop";
import CategoriesPageV2 from "./pages/CategoriesPageV2";
import "./styles/custom.scss";
import TagsPage from "./pages/TagsPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Container className="mt-4 pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} exact={true} />
          <Route
            path="/categories"
            element={<CategoriesPageV2 />}
            exact={true}
          />
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
