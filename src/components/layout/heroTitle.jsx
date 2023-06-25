import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import arrow from "../../assets/home/arrowRight.svg";
import React from "react";
import { Fragment } from "react";
const HeroTitle = ({ crumbs = [] }) => {
  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
        {crumbs?.map((crumb, index) => (
          <React.Fragment key={index}>
            <Typography variant="span" component="span">
              <Link
                to={crumb.link}
                style={{
                  opacity: "0.5",
                  color: "#212121",
                  opacity: crumb.active && "0.5",
                }}
              >
                {crumb.label}
              </Link>
            </Typography>
            <Typography
              mx="8px"
              sx={{ opacity: crumb.active && "0.5" }}
              variant="span"
              component="span"
            >
              {!crumb.active && <img src={arrow} alt="arrow" />}
            </Typography>
          </React.Fragment>
        ))}
      </Box>
    </Fragment>
  );
};

export default HeroTitle;
