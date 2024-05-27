import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import BooksPage from './pages/BooksPage';
import BookPage from './pages/BookPage';
import StatsPage from './pages/StatsPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/categories' element={<CategoriesPage />} exact={true} />
        <Route path='/categories/:categoryId' element={<CategoryPage />} />
        <Route path='/books' element={<BooksPage />} />
        <Route path='/books/:bookId' element={<BookPage />} />
        <Route path='/stats' element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
