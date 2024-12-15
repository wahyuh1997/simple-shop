import electronicsImage from "../assets/image/jumbotron/electronics1.jpg";
import jewelryImage from "../assets/image/jumbotron/jewelry1.jpg";
import menImage from "../assets/image/jumbotron/men.jpg";
import womenImage from "../assets/image/jumbotron/women.jpg";
export default function JumbotronData(category) {
  switch (category) {
    case "electronics":
      return electronicsImage;
    case "jewelery":
      return jewelryImage;
    case "men's clothing":
      return menImage;
    case "women's clothing":
      return womenImage;
  }
}
