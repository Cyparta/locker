import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import Slider from 'react-slick'
import ProductItem from '../common/productItem'
import SideCart from '../cart/sideCart'
import { useDispatch, useSelector } from 'react-redux'
import ProductDetails from '../productDetails/productDetails'
import { useNavigate } from 'react-router-dom'
import { getMeat, setValues } from '../../store/shop/shopSlice'

const OurPackage = () => {


const {allProducts}=useSelector((state)=>state.shop);

console.log(allProducts.results);
const navigate=useNavigate()
const dispatch=useDispatch()
useEffect(()=>{
  dispatch(
    setValues({
      name: "cate",
      value: 1,
    })
  );
  dispatch(getMeat());
},[])
const settings = {
    infinite: true,
    speed: 500,
    slidesToShow:3,
    slidesToScroll: 1,
    autoplaySpeed: 2500,
    autoplay:true,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 533,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
   const titleStyle={
        fontWeight:700,
        fontSize:"32px",
        letterSpacing:"-1.5%",
        lineHeight:"48px",
        color:"#00011F",
        marginBottom:"24px"
    }
    const cardStyle={
        height:"242px",
        width:{
            xl:"32%",
            lg:"32%",
            md:"32%",
            sm:"100%",
            xs:"100%"
        },
        border: "16px solid #F3E6D8",
        marginBottom:{sm:"24px",xs:"24px"},
        textAlign:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent: "center",
        position:"relative",
        ":hover":{
            borderColor:"#9B1D08",
            ".MuiButton-root":{
                bgcolor:"#9B1D08",
                color:"#fff"
            },
            ".Right":{
                borderColor: "#671001 transparent  transparent transparent",
            },
            ".Left":{
                borderColor: " transparent #671001  transparent transparent",
            },
        }
    }
    const sectionStyle={
        display:"flex",
        flexDirection:{
            xl:"row",
            lg:"row",
            md:"row",
            sm:"column",
            xs:"column",
        },
        
        mx:"auto"
    }
    const ButtonStyle={
        height:"68px",
        width:"90%",
        bgcolor:"#F3E6D8",
        color:"#9B1D08",
        fontSize:"24px",
        fontWeight:600,
        lineHeight:"28.44px",
        letterSpacing:"-0.24px",
        mx:"auto",
       
        ":hover":{
            bgcolor:"#F3E6D8",
        }
    }
    const buttonBoxStyle={
        position:"absolute",
        width:"70%",
        bottom:"-42px",
        left:"15%",
        display:"flex",
        justifyContent:"center"
    }
    const shapeRightStyle={
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth:" 18px 21px 0 0",
        borderColor: "#E5D0B9 transparent transparent transparent",
        marginTop:"26px"
    }
    const shapeLeftStyle={
        width: "0",
        height: "0",
        borderStyle: "solid",
        borderWidth:"0 21px 18px 0 ",
        borderColor: " transparent #E5D0B9 transparent transparent",
        marginTop:"26px",
    }
  return (
    <>
        <Box sx={{mt:"100px"}} >
            <Container>
            <Typography sx={titleStyle}>Our Packages</Typography>

            {allProducts?.results?.length<4&&
               allProducts?.results?.map((item) => (
                <Box key={item.id} sx={cardStyle} onClick={()=>{navigate(`/retail/${item.id}`)}}>
                <Typography sx={{fontSize:"32px",fontWeight:700,lineHeight:"37.92px",letterSpacing:"-0.24 px",mb:"16px",mt:"20px"}}>{item.product_name}</Typography>
                <Divider width="80%" style={{marginLeft:"10%"}}/>
                <Typography sx={{color:"#BDBDBD",mt:"16px",fontSize:"14px",fontWeight:400,lineHeight:"16.59px",mx:"25%"}}>{item.description.slice(0,50)}</Typography>
                <Box sx={buttonBoxStyle} >
                    <Typography component="span" sx={shapeLeftStyle} className="Left"></Typography>
                <Button sx={ButtonStyle}>{item.unit_price}$</Button>
                <Typography component="span" sx={shapeRightStyle} className='Right'></Typography>
                </Box>
            </Box>
             ))}
            
            
            {allProducts?.results?.length>3&&
            <Slider {...settings} style={{overflow: "hidden",height:"267px"}}>
          {allProducts?.results?.map((item) => (
            <Box key={item.id} sx={cardStyle} onClick={()=>{navigate(`/retail/${item.id}`)}}>
            <Typography sx={{fontSize:"32px",fontWeight:700,lineHeight:"37.92px",letterSpacing:"-0.24 px",mb:"16px",mt:"20px"}}>{item.product_name}</Typography>
            <Divider width="80%" style={{marginLeft:"10%"}}/>
            <Typography sx={{color:"#BDBDBD",mt:"16px",fontSize:"14px",fontWeight:400,lineHeight:"16.59px",mx:"25%"}}>{item.description.slice(0,50)}</Typography>
            <Box sx={buttonBoxStyle} >
                <Typography component="span" sx={shapeLeftStyle} className="Left"></Typography>
            <Button sx={ButtonStyle}>{item.unit_price}$</Button>
            <Typography component="span" sx={shapeRightStyle} className='Right'></Typography>
            </Box>
        </Box>
                ))}
                 </Slider>
              }
             {<SideCart />}
            </Container>
        </Box>
    </>
  )
}

export default OurPackage