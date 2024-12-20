import PropTypes from "prop-types";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Col, Flex, Row, Typography } from "antd";
import { Footer } from "antd/es/layout/layout";
import { useNavigate } from "react-router";

/* Typography */
const { Title, Text, Link } = Typography;

function createSlug(input) {
  return input
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing spaces
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters except spaces and dashes
    .replace(/\s+/g, "-"); // Replace spaces with dashes
}
export default function FooterComponent({ category }) {
  const navigate = useNavigate();

  return (
    <>
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
                  e.preventDefault();
                  navigate(createSlug(cat));
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
    </>
  );
}

FooterComponent.propTypes = {
  category: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
  fetchData: PropTypes.func,
};
