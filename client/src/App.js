import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import MyNavbar from './components/Navbar';
import Home from './components/Home';
import CategoryForm from './components/CategoryForm';
import CategoryList from "./components/CategoryList";
import CategoryUpdateForm from "./components/CategoryUpdateForm"
import ProductCreateForm from "./components/ProductCreateForm";
import ProductList from "./components/ProductList";
import ProductUpdate from "./components/ProductUpdate";
import ShipmentList from "./components/Shipmentlist";
import ShipmentCreate from "./components/ShipmentCreate";
import PalletList from "./components/PalletList";
import MainPageList from "./components/MainPageList.js";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MainPageList />} />
        <Route path="/category" element={<CategoryForm />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/category/:id" element={<CategoryUpdateForm />} />
        <Route path="/product/create" element={<ProductCreateForm />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductUpdate />} />
        <Route path="/shipments" element={<ShipmentList />} />
        <Route path="/shipment/create" element={<ShipmentCreate />} />
        <Route path="/pallet" element={<PalletList />} />

      </Routes>
    </Router>
  );
}

export default App;
