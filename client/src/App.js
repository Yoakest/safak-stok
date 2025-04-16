import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyNavbar from './components/Navbar';
import Home from './components/Home';
import CategoryForm from './components/CategoryForm';
import CategoryList from "./components/CategoryList";
import CategoryUpdateForm from "./components/CategoryUpdateForm"
import CategoryProductList from "./components/CategoryProductList";
import ProductCreateForm from "./components/ProductCreateForm";
import ProductList from "./components/ProductList";
import ProductUpdate from "./components/ProductUpdate";
import ShipmentList from "./components/Shipmentlist";
import ShipmentCreate from "./components/ShipmentCreate";

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
        <Route path="/product/create" element={<ProductCreateForm />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductUpdate />} />
        <Route path="/shipments" element={<ShipmentList />} />
        <Route path="/shipment/create" element={<ShipmentCreate />} />

      </Routes>
    </Router>
  );
}

export default App;
