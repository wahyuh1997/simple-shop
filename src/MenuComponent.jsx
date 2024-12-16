/* eslint-disable react/prop-types */
import { Menu } from "antd";
import { useNavigate } from "react-router";

export default function MenuComponent({ items, linkActive }) {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[linkActive]}
        items={items}
        style={{
          flex: 2,
          minWidth: 0,
          textTransform: "uppercase",
          justifyContent: "center",
          textAlign: "center",
        }}
        onClick={(e) => {
          let key = e.key - 1;
          navigate(items[key].url);
        }}
      ></Menu>
    </>
  );
}
