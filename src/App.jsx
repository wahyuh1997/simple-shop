import { useEffect, useState } from "react";
import { API_URL } from "./api";
import {
  Avatar,
  Card,
  Col,
  Flex,
  Image,
  Layout,
  Menu,
  Rate,
  Row,
  Spin,
  theme,
  Typography,
} from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  InsuranceOutlined,
  ShoppingCartOutlined,
  SyncOutlined,
  TruckOutlined,
  TwitterOutlined,
  UserOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import jumbotron from "./assets/image/jumbotron2.webp";
import samsung from "./assets/brands/samsung.png";
import acer from "./assets/brands/acer.png";
import sandisk from "./assets/brands/sandisk.png";
import seagate from "./assets/brands/seagate.png";
// import Title from "antd/es/typography/Title";
// import Link from "antd/es/typography/Link";
// import Link from "antd/es/typography/Link";

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  /* Template Layout ANTD */
  const { Header, Content, Footer } = Layout;
  /* Card */
  const { Meta } = Card;
  /* Typography */
  const { Title, Text, Link } = Typography;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  async function fetchData(category = "electronics") {
    setLoading(true);
    try {
      const response = await fetch(API_URL + "products/category/" + category);
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
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
    fetchCategory();
  }, []);

  const items = category.map((cat, i) => ({
    key: i + 1,
    label: cat,
  }));

  return (
    <>
      <Layout>
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

        <Image
          src={jumbotron}
          height={450}
          style={{ objectFit: "cover" }}
          fallback="data:image/png;base64,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"
        />

        <Content
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <section>
            {loading && <Spin />}
            <Title style={{ textAlign: "center" }}>Popular Products</Title>
            <Row gutter={[24, 24]}>
              {products.map((product) => (
                <Col key={product.id} span={6} className="gutter-row">
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
          </section>

          <section>
            <Title style={{ textAlign: "center", marginTop: "6rem" }}>
              Popular Brands
            </Title>
            <Row gutter={[24, 16]} justify="center">
              <Col span={4}>
                <Card
                  style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}
                >
                  <img src={samsung} width={85} alt="" />
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}
                >
                  <img src={acer} width={85} alt="" />
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}
                >
                  <img src={sandisk} width={85} alt="" />
                </Card>
              </Col>
              <Col span={4}>
                <Card
                  style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}
                >
                  <img src={seagate} width={85} alt="" />
                </Card>
              </Col>
            </Row>
          </section>

          <section>
            <Title style={{ textAlign: "center", marginTop: "9rem" }}>
              What We Have To Offer
            </Title>

            <Row>
              <Col span={12}>
                <Title level={4} style={{ textAlign: "center", marginTop: 0 }}>
                  Society has put up so many boundaries, so many limitations on
                  what’s right and wrong that it’s almost impossible to get a
                  pure thought out.
                </Title>
              </Col>
            </Row>

            <Row gutter={[24, 16]} justify="center">
              <Col span={6}>
                <Card>
                  <Col span={6}>
                    <Card type="inner" style={{ backgroundColor: "#1D293A" }}>
                      <TruckOutlined
                        style={{ color: "white", fontSize: "1.8rem" }}
                      />
                    </Card>
                  </Col>
                  <Title level={4}>Express Shipping</Title>
                  <Text>
                    The time is now for it to be okay to be great. People in
                    this world shun people for being great.
                  </Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Col span={6}>
                    <Card type="inner" style={{ backgroundColor: "#1D293A" }}>
                      <SyncOutlined
                        style={{ color: "white", fontSize: "1.8rem" }}
                      />
                    </Card>
                  </Col>
                  <Title level={4}>Free Exchange</Title>
                  <Text>
                    The time is now for it to be okay to be great. People in
                    this world shun people for being great.
                  </Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card>
                  <Col span={6}>
                    <Card type="inner" style={{ backgroundColor: "#1D293A" }}>
                      <InsuranceOutlined
                        style={{ color: "white", fontSize: "1.8rem" }}
                      />
                    </Card>
                  </Col>
                  <Title level={4}>Extended Warranty</Title>
                  <Text>
                    The time is now for it to be okay to be great. People in
                    this world shun people for being great.
                  </Text>
                </Card>
              </Col>
            </Row>
          </section>

          <section>
            <Title style={{ textAlign: "center", marginTop: "9rem" }}>
              Our Customers Opinion
            </Title>

            <Row>
              <Col span={12} offset={6}>
                <Title level={4} style={{ textAlign: "center", marginTop: 0 }}>
                  Society has put up so many boundaries, so many limitations on
                  what’s right and wrong that it’s almost impossible to get a
                  pure thought out.
                </Title>
              </Col>
            </Row>

            <Row gutter={[24, 16]}>
              <Col span={8}>
                <Card>
                  <Rate
                    allowHalf
                    defaultValue={3.5}
                    style={{ display: "block", marginBottom: "1.5rem" }}
                  />
                  <Text>
                    We’re not always in the position that we want to be at.
                    We’re constantly growing. We’re constantly making mistakes.
                    We’re constantly trying to express ourselves and actualize
                    our dreams. If you have the opportunity to play this game of
                    life you need to appreciate every moment.
                  </Text>
                  <Meta
                    avatar={<Avatar src="https://i.imgur.com/HLQBStA.jpeg" />}
                    style={{ marginTop: "1.5rem" }}
                    title="Leonid Afremov"
                    description="Artist"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Rate
                    allowHalf
                    defaultValue={5}
                    style={{ display: "block", marginBottom: "1.5rem" }}
                  />
                  <Text>
                    There’s nothing I really wanted to do in life that I wasn’t
                    able to get good at. That’s my skill. I’m not really
                    specifically talented at anything except for the ability to
                    learn. That’s what I do. That’s what I’m here for. Don’t be
                    afraid to be wrong because you can’t learn anything from a
                    compliment.
                  </Text>
                  <Meta
                    avatar={<Avatar src="https://i.imgur.com/a2Ckz5p.png" />}
                    style={{ marginTop: "1.5rem" }}
                    title="Amy Revives"
                    description="Designer"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Rate
                    allowHalf
                    defaultValue={5}
                    style={{ display: "block", marginBottom: "1.5rem" }}
                  />
                  <Text>
                    It really matters and then like it really doesn’t matter.
                    What matters is the people who are sparked by it. And the
                    people who are like offended by it, it doesn’t matter.
                    Because its about motivating the doers. Because I’m here to
                    follow my dreams and inspire other people to follow their
                    dreams.
                  </Text>
                  <Meta
                    avatar={<Avatar src="https://i.imgur.com/LVGUIAb.png" />}
                    style={{ marginTop: "1.5rem" }}
                    title="Vaspara The Scarlettee"
                    description="Developer"
                  />
                </Card>
              </Col>
            </Row>
          </section>
        </Content>
        <Footer style={{ background: "#EFF3F4" }}>
          {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
          <Row justify="space-evenly">
            <Col span={2}>
              <Title level={3}>Shop</Title>
              {category.map((cat, i) => (
                <Link
                  href="#"
                  style={{
                    display: "block",
                    color: "#010101",
                    marginBottom: "0.5rem",
                    textTransform: "capitalize",
                  }}
                  key={i}
                  onClick={(e) => {
                    e.preventDefault(), fetchData(cat);
                  }}
                >
                  <strong>{cat}</strong>
                </Link>
              ))}
            </Col>
            <Col span={2}>
              <Title level={3}>Company</Title>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                About us
              </Text>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                Stores
              </Text>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                Contacts
              </Text>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                Career
              </Text>
            </Col>
            <Col span={2}>
              <Title level={3}>Support</Title>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                Help
              </Text>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                Delivery
              </Text>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                Return & Refunds
              </Text>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                How to pay ?
              </Text>
            </Col>
            <Col span={2}>
              <Title level={3}>Contacts</Title>
              <Text strong style={{ display: "block", marginBottom: "0.5rem" }}>
                +44 204 578-10-92
              </Text>
              <Flex justify="space-between">
                <TwitterOutlined style={{ fontSize: "1.5rem" }} />
                <InstagramOutlined style={{ fontSize: "1.5rem" }} />
                <FacebookOutlined style={{ fontSize: "1.5rem" }} />
                <YoutubeOutlined style={{ fontSize: "1.5rem" }} />
              </Flex>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
