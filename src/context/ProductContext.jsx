import { PropTypes } from "prop-types";
import { createContext, useEffect, useRef, useState } from "react";
import { API_URL } from "../Api";

const ProductContext = createContext();
function ProductProvider({ children }) {
  const [totalCart, setTotalCart] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    async function fetchDataCart() {
      try {
        const response = await fetch(API_URL + "carts/user/2");
        if (!response.ok) {
          throw new Error("Failed Get Cart");
        }
        const data = await response.json();
        setTotalCart(data[0].products.length);
      } catch (error) {
        console.log(error);
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchDataCart();
  }, []);
  return (
    <>
      <ProductContext.Provider value={{ totalCart, setTotalCart }}>
        {children}
      </ProductContext.Provider>
    </>
  );
}

export { ProductProvider, ProductContext };

ProductProvider.propTypes = {
  children: PropTypes.node,
};
