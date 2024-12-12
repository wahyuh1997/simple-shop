import { useEffect, useState } from "react";
import { API_URL } from "./api";
import { Card, Col, Layout, Menu, Row, Spin, theme } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  /* Template Layout ANTD */
  const { Header, Content, Footer } = Layout;
  /* Card */
  const { Meta } = Card;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(API_URL + "products");
        if (!response.ok) {
          throw new Error("Failed Fetch Data");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCategory() {
      try {
        const res = await fetch(API_URL + "products/categories");

        if (!res.ok) {
          throw new Error("Failed Get Category");
        }

        const data = await res.json();
        console.log(data);
        setCategory(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
    fetchCategory();
  }, []);

  // const items = new Array(3).fill(null).map((_, index) => ({
  //   key: String(index + 1),
  //   label: `nav ${index + 1}`,
  // }));

  const items = category.map((cat, i) => ({
    key: i + 1,
    label: cat,
  }));

  return (
    <>
      <Layout>
        <Header
          style={{
            position: "sticky",
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
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          ></Menu>

          {/* <div style={{ flex: 1 }}>Simple Shop</div> */}
          <Title
            level={3}
            style={{ flex: 1, color: "#f5f5f5", marginBottom: "2rem" }}
            type="light"
          >
            Simple Shop
          </Title>
          <div>
            <ShoppingCartOutlined
              style={{ fontSize: "1.5rem", marginRight: "1.5rem" }}
            />
            <UserOutlined style={{ fontSize: "1.5rem" }} />
          </div>
        </Header>

        <Content>
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {loading && <Spin />}

            <Row gutter={[32, 32]}>
              {products.map((product) => (
                <Col key={product.id} span={4} className="gutter-row">
                  <Card
                    key={product.id}
                    hoverable
                    style={{ width: "100%", textAlign: "center" }}
                    cover={
                      <img
                        alt={product.title}
                        src={product.image}
                        style={{ height: "18rem", objectFit: "contain" }}
                      />
                    }
                  >
                    <Meta
                      title={product.title}
                      description={"$" + product.price}
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default App;
