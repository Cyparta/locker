import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import cardImageMeat from '../../assets/home/bestsell.png'

const BestSeller = () => {
    const BoxSell=[
        {
            id:1,
            image:cardImageMeat,
            title:"The locker box",
            describtion:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit, ",
            price:"200 $- 700 $",
            button:"Add to cart"
        },
        {
            id:2,
            image:cardImageMeat,
            title:"The locker box",
            describtion:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit, ",
            price:"200 $- 700 $",
            button:"Add to cart"
        },
        {
            id:3,
            image:cardImageMeat,
            title:"The locker box",
            describtion:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit, ",
            price:"200 $- 700 $",
            button:"Add to cart"
        },
        {
            id:4,
            image:cardImageMeat,
            title:"The locker box",
            describtion:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit, ",
            price:"200 $- 700 $",
            button:"Add to cart"
        }
    ]
    const headerStyle={display:"flex",justifyContent:"space-between",flexDirection:"row",marginBottom:"24px"}
    const titleStyle={fontSize:"32px",lineHeight:"48px",fontWeight:700,letterSpacing:"-1.5%"}
    const seeMoreStyle={fontSize:"16px",lineHeight:"48px",fontWeight:700,letterSpacing:"-1.5%",color:"#9B1D08"}
    const mainSellerStyle={display:"flex",justifyContent:"space-between",flexDirection:{xl:"row",lg:"row",md:"row",sm:"column",xs:"column"},flexWrap:{md:"wrap"},width:"100%"}
    const cardSellStyle={display:"flex",flexDirection:"column",gap:2,width:{xl:"24%",md:"48%",sm:"100%",xs:"100%"}}
    const sellTitle={fontSize:"18px",fontWeight:600,lineHeight:"21.33px",letterSpacing:"-0.24px"}
    const sellDesc={fontSize:"16px",fontWeight:400,lineHeight:"18.96px",letterSpacing:"-0.41px",color:"#BDBDBD"}
    const sellPrice={fontSize:"12px",fontWeight:600,lineHeight:"14.22px",letterSpacing:"-0.24 px",color:"#00011F"}
    const addCartButton={bgcolor:"#9B1D08",borderRadius:"14px",padding:"10px",textAlign:"center",color:"#fff",textTransform:"none",":hover":{bgcolor:"#9B1D08"}}
  return (
    <Box sx={{mt:"126px"}}>
      <Container>
        <Box sx={headerStyle}>
            <Typography sx={titleStyle}>Best seller</Typography>
            <Typography sx={seeMoreStyle}>See More</Typography>
        </Box>
        <Box sx={mainSellerStyle}>
        {BoxSell.map((product)=>(
            <Box key={product.id} sx={cardSellStyle}>
                <img src={product.image} alt='Best seller'/>
                <Typography sx={sellTitle}>{product.title}</Typography>
                <Typography sx={sellDesc}>{product.describtion}</Typography>
                <Typography sx={sellPrice}>{product.price}</Typography>
                <Button sx={addCartButton}>{product.button}</Button>
            </Box>
        ))}
        </Box>
        </Container>  
    </Box>
  )
}

export default BestSeller
