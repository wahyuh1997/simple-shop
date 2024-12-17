import { useParams } from "react-router";
import { API_URL } from "./Api";
import { useEffect, useState } from "react";
import { Button, Col, Image, Rate, Row, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";

const { Title, Text } = Typography;
export default function Details() {
  let params = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);

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
            <Image
              height={600}
              src={product.image}
              style={{ objectFit: "fill" }}
            />
          </Col>
          <Col span={9}>
            <Col>
              <Title level={2}>{product.title}</Title>
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
            <Col style={{ marginTop: "4rem" }}>
              <Button
                type="primary"
                size="large"
                style={{ background: "#001529" }}
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
