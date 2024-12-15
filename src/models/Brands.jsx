/* eslint-disable no-unreachable */
import samsung from "../assets/brands/electronics/samsung.png";
import acer from "../assets/brands/electronics/acer.png";
import sandisk from "../assets/brands/electronics/sandisk.png";
import seagate from "../assets/brands/electronics/seagate.png";
import business from "../assets/brands/jewelery/business.png";
import christmas from "../assets/brands/jewelery/christmas.png";
import silhouette from "../assets/brands/jewelery/silhouette.png";
import vintage from "../assets/brands/jewelery/vintage.png";

import adidas from "../assets/brands/men/adidas.png";
import nike from "../assets/brands/men/nike.png";
import puma from "../assets/brands/men/puma.png";

import hermes from "../assets/brands/women/hermes.png";
import magazine from "../assets/brands/women/magazine.png";
import circleh from "../assets/brands/women/circle-h.png";

export default function BrandData(category) {
  const electronicsBrand = [
    {
      id: 1,
      image: samsung,
    },
    {
      id: 2,
      image: acer,
    },
    {
      id: 3,
      image: sandisk,
    },
    {
      id: 4,
      image: seagate,
    },
  ];

  const jeweleyBrand = [
    {
      id: 1,
      image: business,
    },
    {
      id: 2,
      image: christmas,
    },
    {
      id: 3,
      image: silhouette,
    },
    {
      id: 4,
      image: vintage,
    },
  ];

  const mensBrand = [
    {
      id: 1,
      image: adidas,
    },
    {
      id: 2,
      image: nike,
    },
    {
      id: 3,
      image: puma,
    },
  ];
  const womensBrand = [
    {
      id: 1,
      image: hermes,
    },
    {
      id: 2,
      image: magazine,
    },
    {
      id: 3,
      image: circleh,
    },
  ];

  // const brand = [];
  switch (category) {
    case "electronics":
      return electronicsBrand;
      break;
    case "jewelery":
      return jeweleyBrand;
      break;
    case "men's clothing":
      return mensBrand;
      break;
    case "women's clothing":
      return womensBrand;
      break;
  }
}
