import { API_URL } from "../Api";
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  Image,
  InputNumber,
  Row,
  theme,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styles from "../styles/App.module.css";

const { Title, Text } = Typography;
export default function CartsComponent() {
  let params = useParams();
  const isFirstRender = useRef(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductById(productId) {
      try {
        const response = await fetch(API_URL + "products/" + productId);
        if (!response.ok) {
          throw new Error("Failed fetch single product");
        }

        const data = await response.json();
        setProducts((prevProducts) => [...prevProducts, data]);
        // return await data;
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch(API_URL + "carts/" + params.cartId);
        if (!response.ok) {
          throw new Error("Failed get carts data");
        }
        const data = await response.json();

        // console.log(data.products);
        setProducts([]);
        data.products.map((product) => fetchProductById(product.productId));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [params.cartId]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Content
        style={{
          padding: 24,
          paddingBottom: "9rem",
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Row justify="center">
          <Col lg={12} style={{ textAlign: "center" }}>
            <Title>Shopping Cart</Title>
            <Title level={3} style={{ marginTop: 0 }}>
              You are eligible for Free Shipping.
            </Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col lg={16}>
            <Row gutter={[16, 16]}>
              <Col lg={14} key={0}>
                {products.map((product, i) => (
                  <div key={i}>
                    {i > 0 ? (
                      <Divider
                        key={i}
                        style={{
                          borderColor: "#001529",
                        }}
                      />
                    ) : (
                      ""
                    )}
                    <Row gutter={[32, 8]} key={product.id}>
                      <Col lg={8}>
                        <Image src={product.image} />
                      </Col>
                      <Col lg={8}>
                        <Title level={3}>{product.title}</Title>
                        <Text>{product.category}</Text>
                      </Col>
                      <Col xs={24} lg={8}>
                        <Flex
                          justify="space-between"
                          align="center"
                          style={{ marginTop: "1.75rem" }}
                        >
                          <InputNumber min={1} max={100} defaultValue={1} />
                          <Title
                            level={3}
                            style={{
                              display: "inline",
                              marginTop: 0,
                              marginBottom: 0,
                            }}
                          >
                            $ {product.price}
                          </Title>
                        </Flex>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Col>
              <Col lg={10} key={1}>
                <Card
                  className={styles.cardSummary}
                  style={{ padding: "0 2rem" }}
                >
                  <Title level={3}>Order Summary</Title>
                  {/* Subtotal */}
                  <Row>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: "1.25rem" }}>
                        Subtotal
                      </Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Text type="secondary" style={{ fontSize: "1.25rem" }}>
                        $388
                      </Text>
                    </Col>
                  </Row>
                  {/* Shipping */}
                  <Row style={{ marginTop: "1.5rem" }}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: "1.25rem" }}>
                        Shipping Estimate
                      </Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Text type="secondary" style={{ fontSize: "1.25rem" }}>
                        $0
                      </Text>
                    </Col>
                  </Row>
                  {/* TAX */}
                  <Row style={{ marginTop: "2rem" }}>
                    <Col span={12}>
                      <Text type="secondary" style={{ fontSize: "1.25rem" }}>
                        Tax Estimate
                      </Text>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Text type="secondary" style={{ fontSize: "1.25rem" }}>
                        $7
                      </Text>
                    </Col>
                  </Row>
                  <Divider />
                  {/* Total */}
                  <Row>
                    <Col span={12}>
                      <Title level={3}>Total</Title>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Title level={3}>$7</Title>
                    </Col>
                  </Row>
                  <Button
                    block
                    type="primary"
                    size="large"
                    style={{ background: "#001529" }}
                  >
                    Checkout
                  </Button>
                  <Col
                    span={24}
                    style={{
                      textAlign: "center",
                      marginBottom: "3rem",
                      marginTop: "1rem",
                    }}
                  >
                    <Text type="secondary" style={{ fontSize: "1.15rem" }}>
                      Tax included. Shipping calculated at checkout.
                    </Text>
                  </Col>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Content>
    </>
  );
}
