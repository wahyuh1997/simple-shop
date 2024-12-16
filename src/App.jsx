import PropTypes from "prop-types";
import { createContext, useEffect, useRef, useState } from "react";
import { API_URL } from "./api";
import { Layout } from "antd";

/* Import Component */
import HeadersComponent from "./HeadersComponent";
import FooterComponent from "./FooterComponent";
import { Outlet } from "react-router";
// import ProductsComponent from "./ProductsComponent";
export const MyContext = createContext();

export default function App() {
  const [category, setCategory] = useState([]);
  const isFirstRender = useRef(true);

  /* Import Model */

  async function fetchCategory() {
    try {
      const res = await fetch(API_URL + "products/categories");

      if (!res.ok) {
        throw new Error("Failed Get Category");
      }

      const data = await res.json();
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchCategory();
  }, []);

  return (
    <>
      <Layout>
        <HeadersComponent category={category} />

        <MyContext.Provider value="">
          <Outlet />
        </MyContext.Provider>

        <FooterComponent category={category} />
      </Layout>
    </>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
