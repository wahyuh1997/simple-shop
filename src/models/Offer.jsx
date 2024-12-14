import {
  InsuranceOutlined,
  SyncOutlined,
  TruckOutlined,
} from "@ant-design/icons";

export const offerData = [
  {
    id: "express_shipping",
    title: "Express Shipping",
    icon: <TruckOutlined style={{ color: "white", fontSize: "1.5rem" }} />,
    description:
      "Get your orders delivered faster than ever. With our express shipping, your essentials will reach you in no time.",
  },
  {
    id: "free_exchange",
    title: "Free Exchange",
    icon: <SyncOutlined style={{ color: "white", fontSize: "1.5rem" }} />,
    description:
      "Changed your mind? No worries. Enjoy hassle-free exchanges to ensure you’re always satisfied with your purchase.",
  },
  {
    id: "extended_warranty",
    title: "Extended Warranty",
    icon: <InsuranceOutlined style={{ color: "white", fontSize: "1.5rem" }} />,
    description:
      "Rest easy with our extended warranty, designed to protect your products for longer and give you ultimate confidence.",
  },
];
