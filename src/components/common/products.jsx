import Heading from "./comman/heading";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductItem from "./productItem";
import { useSelector } from "react-redux";
import SideCart from "./sideCart";
const Products = () => {
  const { items } = useSelector((state) => state.products);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className="spad">
      {/*------ heading ------*/}
      <Heading title="Products" />
      <Box>
        <Slider {...settings}>
          {items?.results?.map((item) => (
            <Box key={item.id}>
                <ProductItem {...item} w="img-cover"/> 
            </Box>
          ))}
        </Slider>
      </Box>
      {<SideCart />}
    </Box>
  );
};

export default Products;
