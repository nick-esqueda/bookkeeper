import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookPage from "./pages/BookPage";
import CategoriesPage from "./pages/CategoriesPage";
import TagsPage from "./pages/TagsPage";
import StatsPage from "./pages/StatsPage";
import Header from "./components/pageSpecific/Header";
import ScrollToTop from "./components/utils/ScrollToTop";
import "./styles/custom.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Container className="mt-4 pt-5">
        <Routes>
          <Route path="/" element={<HomePage />} exact={true} />
          <Route path="/categories" element={<CategoriesPage />} exact={true} />
          <Route
            path="/categories/:categoryId"
            element={<CategoriesPage />}
            exact={true}
          />
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
