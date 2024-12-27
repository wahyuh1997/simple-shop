import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  Col,
  Image,
  Input,
  Layout,
  Rate,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import { API_URL } from "../Api";
import { offerData } from "../models/Offer";
import { reviewData } from "../models/Review";
import { useNavigate, useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/App.module.css";

/* Import Models */
import BrandData from "../models/Brands";
import JumbotronData from "../models/Jumbotron";

/* Template Layout ANTD */
const { Content } = Layout;
/* Card */
const { Meta } = Card;
/* Typography */
const { Title, Text, Link } = Typography;

function reverseSlug(slug) {
  return slug
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/\bmens\b/, "men's") // Handle "mens" -> "men's"
    .replace(/\bwomens\b/, "women's"); // Handle "womens" -> "women's"
}

export default function ProductsComponent() {
  const params = useParams();

  params.productCategory =
    params.productCategory == "mens-clothing" ||
    params.productCategory == "womens-clothing"
      ? reverseSlug(params.productCategory)
      : params.productCategory;

  const [products, setProducts] = useState([]);
  // const [category, setCategory] = useState("electronics");

  const [brands, setBrands] = useState([]);
  const [jumbotron, setJumbotron] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isFirstRender = useRef(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          API_URL + "products/category/" + params.productCategory
        );
        if (!response.ok) {
          throw new Error("Failed Fetch Data");
        }

        setBrands(BrandData(params.productCategory));
        setJumbotron(JumbotronData(params.productCategory));

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    fetchData();
  }, [params.productCategory]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Image
        className={styles.jumbotron}
        src={jumbotron}
        preview={!loading}
        // height={450}
        style={{ objectFit: "inherit" }}
        fallback="data:image/png;base64,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"
      />

      <Content
        style={{
          padding: 24,
          paddingBottom: "9rem",
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <section>
          <Title style={{ textAlign: "center", marginTop: "3rem" }}>
            Exclusive Products
          </Title>
          <Row gutter={[24, 24]}>
            {products.map((product) => (
              <Col key={product.id} xs={12} lg={6} className="gutter-row">
                <Card
                  key={product.id}
                  hoverable
                  style={{ width: "100%", textAlign: "center" }}
                  loading={loading}
                  onClick={() => navigate("details/" + product.id)}
                  cover={
                    <Image
                      alt={product.title}
                      src={product.image}
                      preview={!loading}
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
        </section>

        <section>
          <Title style={{ textAlign: "center", marginTop: "6rem" }}>
            Popular Brands
          </Title>
          <Row gutter={[24, 16]} justify="center">
            {brands.map((brand) => (
              <Col key={brand.id} xl={4}>
                <Card
                  style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}
                >
                  <img src={brand.image} width={85} alt="" />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section>
          <Title style={{ textAlign: "center", marginTop: "9rem" }}>
            What We Have To Offer
          </Title>

          <Row justify={"center"}>
            <Col lg={12}>
              <Title level={4} style={{ textAlign: "center", marginTop: 0 }}>
                We go the extra mile to bring you convenience, flexibility, and
                peace of mind. Here`s why you`ll love choosing us.
              </Title>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="center">
            {offerData.map((offer) => (
              <Col key={offer.id} lg={6}>
                <Card>
                  <Col span={6} style={{ paddingLeft: 0 }}>
                    <Card
                      type="inner"
                      size="small"
                      style={{
                        backgroundColor: "#1D293A",
                        textAlign: "center",
                        width: "4rem",
                      }}
                    >
                      {offer.icon}
                    </Card>
                  </Col>
                  <Title level={4} style={{ marginTop: "1rem" }}>
                    {offer.title}
                  </Title>
                  <Text>{offer.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section>
          <Title style={{ textAlign: "center", marginTop: "9rem" }}>
            Our Customers Opinion
          </Title>

          <Row justify={"center"}>
            <Col lg={12}>
              <Title level={4} style={{ textAlign: "center", marginTop: 0 }}>
                Society has put up so many boundaries, so many limitations on
                what’s right and wrong that it’s almost impossible to get a pure
                thought out.
              </Title>
            </Col>
          </Row>

          <Row gutter={[24, 16]} justify="center">
            {reviewData.map((review) => (
              <Col key={review.id} lg={6}>
                <Card>
                  <Rate
                    allowHalf
                    defaultValue={review.rate}
                    style={{ display: "block", marginBottom: "1.5rem" }}
                  />
                  <Text>{review.desc}</Text>
                  <Meta
                    avatar={<Avatar src={review.image} />}
                    style={{ marginTop: "1.5rem" }}
                    title={review.name}
                    description={review.job}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section>
          <Row justify={"center"}>
            <Col lg={6}>
              <Title style={{ textAlign: "center", marginTop: "9rem" }}>
                Subscribe our newsletter to get all updates
              </Title>
            </Col>
          </Row>

          <Row justify={"center"}>
            <Col lg={12}>
              <Title level={4} style={{ textAlign: "center", marginTop: 0 }}>
                Stay in the loop with the latest news, exclusive deals, and
                updates—delivered straight to your inbox!
              </Title>
            </Col>
          </Row>

          <Row justify={"center"}>
            <Col lg={6}>
              <Space.Compact style={{ width: "100%" }}>
                <Input placeholder="Enter your email" />
                <Button type="default" color="default" variant="solid">
                  Subscribe
                </Button>
              </Space.Compact>
            </Col>
          </Row>

          <Row justify={"center"}>
            <Col lg={6} style={{ textAlign: "center" }}>
              <Text type="secondary" style={{ display: "block" }}>
                You will be able to unsubscribe at any time.
              </Text>
              <Text type="secondary">Read our Privacy Policy </Text>
              <Link href="https://ant.design" target="_blank">
                here
              </Link>
            </Col>
          </Row>
        </section>
      </Content>
    </>
  );
}

ProductsComponent.propTypes = {
  jumbotron: PropTypes.string,
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  brands: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  loading: PropTypes.bool,
};
