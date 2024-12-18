import { useParams } from "react-router";
import { API_URL } from "./Api";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Image,
  InputNumber,
  notification,
  Rate,
  Row,
  Skeleton,
  theme,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { ProductContext } from "./context/ProductContext";

const { Title, Text } = Typography;
export default function Details() {
  let params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [qty, setQty] = useState(1);

  const { totalCart, setTotalCart } = useContext(ProductContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    async function fetchSingleData() {
      setLoading(true);
      try {
        const response = await fetch(API_URL + "products/" + params.productsId);
        if (!response.ok) {
          throw new Error("Failed Fetch Data");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchSingleData();
  }, [params.productsId]);

  async function handleAddToCart() {
    setButtonLoading(true);
    setShowNotif(false);
    try {
      const res = await fetch(API_URL + "carts", {
        method: "POST",
        body: JSON.stringify({
          userId: 5,
          date: "2020-02-03",
          products: [{ productId: 5, quantity: 1 }],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed add to cart");
      }

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setButtonLoading(false);
      setShowNotif(true);
    }
  }

  useEffect(() => {
    if (showNotif) {
      notification.success({
        message: "Success",
        description: "Add To Cart Successfuly",
        duration: 2, // notification duration in seconds
      });
    }
  }, [showNotif]);

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
        <Row justify="start">
          <Col span={16} offset={4}>
            <Title level={3}>Product Overview</Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
          <Col span={7}>
            {loading ? (
              <Skeleton.Image active />
            ) : (
              <Image
                height={600}
                src={product.image}
                style={{ objectFit: "fill" }}
                fallback="data:image/png;base64,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"
              />
            )}
          </Col>
          <Col span={9}>
            <Col>
              {loading ? (
                <Skeleton active paragraph={{ rows: 2 }} title={false} />
              ) : (
                <Title level={2}>{product.title}</Title>
              )}
            </Col>
            <Col>
              <Title level={4} style={{ textTransform: "capitalize" }}>
                {product.category}
              </Title>
            </Col>
            <Col>
              <Title level={5} type="secondary">
                {product.description}
              </Title>
            </Col>
            <Col>
              <Title level={3}>${product.price}</Title>
            </Col>
            <Col>
              <Title
                level={3}
                className="sr-only"
                style={{ marginBottom: 0, marginTop: 0 }}
              >
                Reviews
              </Title>
            </Col>
            <Col>
              <Row>
                <Col style={{ marginTop: "1rem" }}>
                  <Rate allowHalf disabled value={product.rating?.rate || 0} />
                </Col>
                <Col style={{ marginTop: "0.80rem" }}>
                  <Title
                    level={5}
                    style={{
                      display: "inline",
                      marginLeft: "1rem",
                    }}
                  >
                    {product.rating?.count || 0} Reviews
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col style={{ marginTop: "2rem" }}>
              <InputNumber
                min={1}
                max={100}
                defaultValue={qty}
                style={{
                  display: "block",
                  width: "10rem",
                  marginBottom: "1rem",
                }}
                onChange={(e) => {
                  setQty(e);
                }}
              />
              <Button
                type="primary"
                size="large"
                style={{ background: "#001529" }}
                onClick={() => {
                  handleAddToCart();
                  setTotalCart(qty + totalCart);
                }}
                loading={buttonLoading}
              >
                Add to cart
              </Button>
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <Title level={2}>Product Description</Title>
            <Title level={5} style={{ marginTop: "0.5rem" }}>
              There`s nothing I really wanted to do in life that I wasn`t able
              to get good at. That`s my skill. I`m not really specifically
              talented at anything except for the ability to learn. That`s what
              I do. That`s what I`m here for. Don`t be afraid to be wrong
              because you can`t learn anything from a compliment.
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <Title level={5}>Benefits</Title>
            <ul>
              <li>
                Oil is a primary source of energy for various sectors, including
                transportation, industries, and residential use.
              </li>
              <li>
                Oil is highly versatile and used in the production of a wide
                range of products. It serves as a raw material for manufacturing
                plastics
              </li>
              <li>
                Oil is a crucial source of petrochemicals, which are used in the
                production of plastics.
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col span={16} offset={4}>
            <Title level={5}>More about product</Title>
            <Text>
              There`s nothing I really wanted to do in life that I wasn`t able
              to get good at. That`s my skill. I`m not really specifically
              talented at anything except for the ability to learn
            </Text>
          </Col>
        </Row>
      </Content>
    </>
  );
}
