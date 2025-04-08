import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavbar from './components/Navbar';
import Home from './components/Home';
import CategoryForm from './components/CategoryForm';
import CategoryList from "./components/CategoryList";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<CategoryForm />} />
        <Route path="/category-list" element={<CategoryList />} />
      </Routes>
    </Router>
  );
}

export default App;
