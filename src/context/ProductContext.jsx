import { PropTypes } from "prop-types";
import { createContext } from "react";
import { API_URL } from "../Api";

const ProductContext = createContext();
function ProductProvider({ children }) {
  return (
    <>
      <ProductContext.Provider value={API_URL}>
        {children}
      </ProductContext.Provider>
    </>
  );
}

export { ProductProvider, ProductContext };

ProductProvider.propTypes = {
  children: PropTypes.node,
};
