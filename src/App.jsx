import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "./api";
import { Layout } from "antd";

/* Import Component */
import HeadersComponent from "./HeadersComponent";
import FooterComponent from "./FooterComponent";
import { Outlet, useLocation } from "react-router";
import { ProductProvider } from "./context/ProductContext";

function reverseSlug(slug) {
  return slug
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\bmens\b/, "men's") // Handle "mens" -> "men's"
    .replace(/\bwomens\b/, "women's"); // Handle "womens" -> "women's"
}

export default function App() {
  const [category, setCategory] = useState([]);
  const [linkActive, setLinkActive] = useState(1);
  const isFirstRender = useRef(true);
  const location = useLocation();

  /* Import Model */

  async function fetchCategory() {
    try {
      const res = await fetch(API_URL + "products/categories");

      if (!res.ok) {
        throw new Error("Failed Get Category");
      }

      const data = await res.json();

      let searchText =
        location.pathname == "/"
          ? "electronics"
          : reverseSlug(location.pathname); // Example input
      // Normalize the text for comparison
      const normalize = (text) =>
        text.toLowerCase().replace(/^\//, "").replace(/[\s']/g, "-");

      // Normalize the search text
      searchText = normalize(searchText);

      // Find the index (key) of the matching item
      const index = data.findIndex(
        (category) => normalize(category) == searchText
      );

      setCategory(data);

      setLinkActive(String(index + 1));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Layout>
        <HeadersComponent
          category={category}
          linkactive={String(linkActive)}
          setlinkactive={setLinkActive}
        />

        <ProductProvider>
          <Outlet />
        </ProductProvider>

        <FooterComponent category={category} />
      </Layout>
    </>
  );
}

App.propTypes = {
  children: PropTypes.node,
};
