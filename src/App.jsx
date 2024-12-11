import { useEffect, useState } from "react";
import { API_URL } from "./api";
import { Card, Col, Layout, Menu, Row, Spin, theme } from "antd";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  /* Template Layout ANTD */
  const { Header, Content, Footer } = Layout;
  /* Card */
  const { Meta } = Card;

  const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));

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

    fetchData();
  }, []);

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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          ></Menu>
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
                        style={{ height: "18rem" }}
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
