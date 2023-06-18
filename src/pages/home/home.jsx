import { Container, Box } from "@mui/material";
import ContactUs from "../../components/home/contactUs";
import GoogleMap from "../../components/home/googleMap";
import Landing from "../../components/home/landing";
// import Products from "../../components/products";
// import Services from "../../components/services";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../store/products/productsSlice";
import PageMeta from "../../components/layout/PageMeta";
// import CollectionMenu from "../../components/home/collectionMenu";
import { getCollection } from "../../store/shop/shopSlice";
// import NewServices from "../../components/home/NewServices";
// import Discover from "../../components/home/discover";
// import SliderHome from "../../components/home/sliderHome";

// import logoSection from "../../assets/icons/logoSection.png";
import OurPackage from "../../components/home/ourPackage";
import BestSeller from "../../components/home/bestSeller";
import FAQSection from "../../components/home/faqSection";
import Contact from "../../components/home/contact";




const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCollection());
  }, [dispatch]);
  return (
    <>
      <PageMeta
        title="Grays and Danny's"
        desc="Shop premium meat products at Grays and Danny's florida halal meat. We offer high-quality beef, pork, chicken, and more, sourced from local farms and raised with care. Our meats are expertly prepared and delivered fresh to your door, so you can enjoy the best-tasting and healthiest meats available. With fast and reliable shipping, easy returns, and exceptional customer service, Grays and Danny's is your one-stop online destination for all your meat needs."
      />
       <Landing />
       <OurPackage/>
       <BestSeller/>
       <FAQSection/>
       <Contact/>
       {/* <Services /> */}
      {/* <Container sx={{ overflow: "hidden" }}>
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            "img": { width: { xs: "250px", md: "auto" } },
          }}
          className="spad"
        >
          <img src={logoSection} alt="logo Section" />
        </Box>
        <CollectionMenu />
      </Container> */}
      {/* <Box mt="100px">
        <SliderHome />
      </Box> */}
      <Container>
        {/* <Discover /> */}
       
        {/* <NewServices /> */}
        {/* <ContactUs /> */}
        
      </Container>
      {/* <Box mt="50px" id="branches">
        <GoogleMap />
      </Box> */}
    </>
  );
};

export default Home;
