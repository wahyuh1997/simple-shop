import { PropTypes } from "prop-types";
import { createContext } from "react";

const ProductContext = createContext();
function ProductProvider({ children }) {
  return (
    <>
      <ProductContext.Provider value="">{children}</ProductContext.Provider>
    </>
  );
}

export { ProductProvider, ProductContext };

ProductProvider.propTypes = {
  children: PropTypes.node,
};
