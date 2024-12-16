import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Details from "./Details.jsx";
import ProductsComponent from "./ProductsComponent.jsx";
// import Electronics from "./pages/Electronics.jsx";
// import Jewelry from "./pages/Jewelry.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/:productCategory" element={<ProductsComponent />} />
          {/* <Route path="jewelery" element={<Jewelry />} /> */}
          <Route path="details/:productsId" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
