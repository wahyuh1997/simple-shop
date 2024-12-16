/* eslint-disable react/prop-types */
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Header } from "antd/es/layout/layout";
// import { useNavigate } from "react-router";
import MenuComponent from "./MenuComponent";
// import { useEffect, useState } from "react";
const { Title } = Typography;

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

  return (
    <>
      <Header
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

        <div style={{ flex: 1, textAlign: "right" }}>
          <ShoppingCartOutlined
            style={{ fontSize: "1.5rem", marginRight: "1.5rem" }}
          />
          <UserOutlined style={{ fontSize: "1.5rem" }} />
        </div>
      </Header>
    </>
  );
}
