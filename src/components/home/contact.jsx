import { Box, Container, Typography } from "@mui/material";
import React from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
const Contact = () => {
  const contactData = [
    {
      id: 1,
      title: "Phone",
      state: "+1 815-428-7376",
      icon: <LocalPhoneOutlinedIcon />,
    },
    {
      id: 2,
      title: "Location",
      state: "105 South East Avenue, Papineau",
      icon: <LocationOnOutlinedIcon />,
    },
    {
      id: 3,
      title: "Working Hours",
      state: "Mon - Sat 08:30 - 17:00",
      icon: <LockOpenOutlinedIcon />,
    },
  ];
  const contactStyle = {
    bgcolor: "#F3E6D8",
    mt: "100px",
    width:"100%",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    pt:"33px"
  };
  const mainCardStyle={
    display:"flex",
    height:"100%",
    flexDirection:{lg:"row",md:"row",sm:"column",xs:"column"},
    justifyContent:{xl:"space-between"},
   
  }
  const cardStyle={display:"flex",flexDirection:"row",justifyContent:"center",height:"129px",}
  const iconStyle={color:"#fff",bgcolor:"#8F5147",boxShadow:"0px 4px 40px rgba(155, 29, 8, 0.08)",height:"64px",width:"64px",justifyContent:"center",display:"flex",flexDirection:"column",borderRadius:"50%",mr:"17px"}
  const titleStyle={fontSize:"12px",color:"#9D9D9D",fontWeight:500}
  const StateStyle={fontSize:"16px",lineHeight:"48px",color:"#121212",fontWeight:700,letterSpacing:"-1.5%"}
  return <Box sx={contactStyle}>
    <Container>
        <Box sx={mainCardStyle}>
        {contactData.map((conact)=>(
            <Box key={conact.id} sx={cardStyle}>
                <Box sx={iconStyle}>
                    <Typography sx={{fontSize:"2rem",textAlign:"center"}}>{conact.icon}</Typography>
                    </Box>
                <Box sx={{height:"72px"}}>
                    <Typography sx={titleStyle}>{conact.title}</Typography>
                    <Typography sx={StateStyle}>{conact.state}</Typography>
                </Box>
            </Box>
        ))}
        </Box>
    </Container>
  </Box>;
};

export default Contact;
