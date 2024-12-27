/* eslint-disable react/prop-types */
import { Menu } from "antd";
import { useNavigate } from "react-router";
import styles from "../styles/App.module.css";

export default function MenuComponent({ items, linkActive, setlinkactive }) {
  const navigate = useNavigate();

  return (
    <>
      <Menu
        className={styles.menu}
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
          fontSize: "16px", // Adjust size
        }}
        onClick={(e) => {
          const key = e.key - 1;
          setlinkactive(e.key);
          navigate(items[key].url);
        }}
      />
    </>
  );
}
