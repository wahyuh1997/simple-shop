/* eslint-disable react/prop-types */
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import MenuComponent from "./MenuComponent";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router";
const { Title } = Typography;
import styles from "../styles/App.module.css";

function createSlug(input) {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and dashes
    .replace(/\s+/g, "-"); // Replace spaces with dashes
}

export default function HeadersComponent({
  category,
  linkactive,
  setlinkactive,
}) {
  const items = category.map((cat, i) => ({
    key: i + 1,
    label: cat,
    url: createSlug(cat),
  }));

  const ctx = useContext(ProductContext);

  const navigate = useNavigate();

  return (
    <>
      <Header
        className={styles.header}
        style={{
          position: "static",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          color: "#f5f5f5",
        }}
      >
        <Title
          className={styles.titleNav}
          level={3}
          style={{ flex: 1, color: "#f5f5f5", marginBottom: "2rem" }}
          type="light"
        >
          Simple Shop
        </Title>

        <MenuComponent
          items={items}
          linkActive={linkactive}
          setlinkactive={setlinkactive}
        />

        <div
          className={styles.profileHeader}
          style={{ flex: 1, textAlign: "right" }}
        >
          <Badge count={ctx.totalCart} size="small" offset={[-9, 14]}>
            <Avatar
              icon={<ShoppingCartOutlined />}
              size={{ xs: 40, sm: 32, md: 40, lg: 50, xl: 64, xxl: 47 }}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("carts/5")}
            />
          </Badge>

          <Avatar
            icon={<UserOutlined />}
            size={{ xs: 40, sm: 32, md: 40, lg: 50, xl: 64, xxl: 47 }}
            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
          />
        </div>
      </Header>
    </>
  );
}
