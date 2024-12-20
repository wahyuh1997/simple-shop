import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Details from "./pages/Details.jsx";
import ProductsComponent from "./pages/ProductsComponent.jsx";
import CartsComponent from "./pages/CartsComponent.jsx";
// import Electronics from "./pages/Electronics.jsx";
// import Jewelry from "./pages/Jewelry.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect index path "/" to "/electronics" */}
          <Route index element={<Navigate to="/electronics" replace />} />
          {/* Route for product category */}
          <Route path=":productCategory" element={<ProductsComponent />} />
          {/* Route for product details */}
          <Route
            path=":productCategory/details/:productsId"
            element={<Details />}
          />
          <Route path="carts/:cartId" element={<CartsComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
