import { Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

const OurPackage = () => {
const Data=[
    {id:1,title:"The locker box",description:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit,",price:"200$"},
    {id:2,title:"The locker box",description:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit,",price:"200$"},
    {id:3,title:"The locker box",description:"Lorem ipsum dolor sit amet, cons ectetur adipiscing elit,",price:"200$"},
]

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
        flexWrap:"wrap",
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
            <Stack gap={3} sx={sectionStyle}>
            {Data.map((card)=>(
                <Box key={card.id} sx={cardStyle}>
                    <Typography sx={{fontSize:"32px",fontWeight:700,lineHeight:"37.92px",letterSpacing:"-0.24 px",mb:"16px"}}>{card.title}</Typography>
                    <Divider width="80%" style={{marginLeft:"10%"}}/>
                    <Typography sx={{color:"#BDBDBD",mt:"16px",fontSize:"14px",fontWeight:400,lineHeight:"16.59px",mx:"25%"}}>{card.description}</Typography>
                    <Box sx={buttonBoxStyle} >
                        <Typography component="span" sx={shapeLeftStyle} className="Left"></Typography>
                    <Button sx={ButtonStyle}>{card.price}</Button>
                    <Typography component="span" sx={shapeRightStyle} className='Right'></Typography>
                    </Box>
                </Box>
            ))}
            </Stack>
            </Container>
        </Box>
    </>
  )
}

export default OurPackage