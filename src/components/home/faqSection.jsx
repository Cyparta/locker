import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';

const FAQSection = () => {
  const [expanded,setExpanded]=useState(false)
  const [Index,setIndex]=useState(0)
  const HandleClick=(e,index)=>{
    setIndex(index)
    setExpanded(!expanded)
    console.log(Index);
  }
  const accordCard = [
    {
      id: 1,
      title: "Why can i trust you ?",
      discribtion:
        "Why can i trust you, Why can i trust you Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  ",
    },
    {
      id: 2,
      title: "Our commitment to quality ?",
      discribtion:
        "Why can i trust you, Why can i trust you Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  ",
    },
    {
      id: 3,
      title: "Our Seasoned Butchers ?",
      discribtion:
        "Why can i trust you, Why can i trust you Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  ",
    },
    {
      id: 4,
      title: "Pop-up & open air markets ?",
      discribtion:
        "Why can i trust you, Why can i trust you Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  ",
    },
    {
      id: 5,
      title: "Our boxes ?",
      discribtion:
        "Why can i trust you, Why can i trust you Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  Why can i trust you, Why can i trust you  ",
    },
  ];

  const headerStyle = {
    fontSize: "32px",
    fontWeight: 700,
    lineHeight: "48px",
    letterSpacing: "-1.5%",
    mb: "24px",
  };
  const accordTitleStyle = {
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "48px",
    letterSpacing: "-1.5%",
   
  };
  const TitleExpandedStyle={
    color:"#9B1D08",
    fontSize: "18px",
    fontWeight: 500,
    lineHeight: "48px",
    letterSpacing: "-1.5%",
  }
  const accordIconStyle = {
    color: "#9B1D08",
    fontSize: "2rem",
  };
  const accordMiniStyle={
    transform: "rotate(90deg)",
    color:"#212121",fontSize:"2rem"
  }
  const accordSummartStyle = {
    display: "flex",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: "12px",
    },
  };

  const accordDetailStyle = {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "19.5px",
    letterSpacing: "-1.5%",
    color: "#7F7F7F",
    marginLeft: "4%",
    marginRight: "4%",
    borderTop: "1px solid #9D9D9D",
    pt: "16px",
    pb: "24px",
  };


  return (
    <Box sx={{ mt: "100px" }}>
      <Container>
        <Typography sx={headerStyle}>FAQ</Typography>
        <Box>
          {accordCard.map((accord,index)=>(
          <Accordion
          onClick={(e)=>{HandleClick(e,index)}}
          // key={accord.id}
          key={index}
            TransitionProps={{ unmountOnExit: true }}
            disableGutters
            elevation={0}
            square
            sx={{
              '&:first-of-type': {
                borderRadius: "16px 16px 0 0",
              },
              '&:last-of-type': {
                borderRadius: "0 0 16px 16px ",
              },
              border: "1px solid #9D9D9D",
              
            }}
          >
            <AccordionSummary
              expandIcon={expanded && index===Index ?<RemoveIcon sx={accordMiniStyle}/>:<AddIcon sx={accordIconStyle} />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              sx={accordSummartStyle}
            >
              <Typography sx={expanded && Index===index ? TitleExpandedStyle:accordTitleStyle}>
               {accord.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={accordDetailStyle}>
                {accord.discribtion}
              </Typography>
            </AccordionDetails>
          </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection;
