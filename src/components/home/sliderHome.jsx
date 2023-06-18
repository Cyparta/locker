import React from "react";
import Slider from "react-slick";
import rectangle from "../../assets/home/rectangle.png";
import retail from "../../assets/home/retail.png";
import wholesale from "../../assets/home/wholesale.png";
import odhiha from "../../assets/home/odhiha.png";
import aqqeqa from "../../assets/home/aqqeqa.png";
import { Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const SliderHome = () => {
  const isMobile = useMediaQuery("(max-width:576px)");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div style={{ width: "100%" }} id="services">
      {isMobile && (
        <Slider {...settings}>
          <div>
            <Link to="/retail">
              <img src={retail} alt="retail" width={"100%"} />
            </Link>
          </div>
          <div>
            <Link to="/wholesale">
               <img src={wholesale} alt="wholesale" width={"100%"} />
            </Link>
          </div>
          <div>
            <Link to="/odhiah">
              <img src={odhiha} alt="rectangle" width={"100%"} />
            </Link>
          </div>
          <div>
            <Link to="/aqqeqa">
              <img src={aqqeqa} alt="rectangle" width={"100%"} />
            </Link>
          </div>
        </Slider>
      )}
      {!isMobile && (
        <Box sx={{ display: "flex", justifyContent:"center" }}>
          <Box>
            <Link to="/retail">
              <img src={retail} alt="rectangle" width={"100%"} />
            </Link>
          </Box>
          <Box>
            <Link to="/wholesale">
              <img src={wholesale} alt="rectangle" width={"100%"} />
            </Link>
          </Box>
          <Box>
            <Link to="odhiah">
              <img src={odhiha} alt="rectangle" width={"100%"} />
            </Link>
          </Box>
          <Box>
            <Link to="aqqeqa">
              <img src={aqqeqa} alt="rectangle" width={"100%"} />
            </Link>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default SliderHome;
