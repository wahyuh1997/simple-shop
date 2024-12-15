import PropTypes from "prop-types";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
const { Title } = Typography;

export default function HeadersComponent({ category, fetchData }) {
  const items = category.map((cat, i) => ({
    key: i + 1,
    label: cat,
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
        {/* <div className="demo-logo" /> */}
        <Title
          level={3}
          style={{ flex: 1, color: "#f5f5f5", marginBottom: "2rem" }}
          type="light"
        >
          Simple Shop
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
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
            fetchData(items[key].label);
          }}
        ></Menu>

        {/* <div style={{ flex: 1 }}>Simple Shop</div> */}

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

HeadersComponent.propTypes = {
  category: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  fetchData: PropTypes.func,
};
