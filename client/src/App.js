import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavbar from './components/Navbar';
import Home from './components/Home';
import CategoryForm from './components/CategoryForm';
import CategoryList from "./components/CategoryList";
import CategoryUpdateForm from "./components/CategoryUpdateForm"
import CategoryProductList from "./components/CategoryProductList";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryForm />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category/:id" element={<CategoryUpdateForm />} />
        <Route path="/category-product/:id" element={<CategoryProductList />} />
        <Route path="/product" element={<CategoryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
