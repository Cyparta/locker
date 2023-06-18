import { Typography, Box } from "@mui/material";
import React from "react";
// import cow2 from "../../assets/icons/cow2.png";
import { useDispatch, useSelector } from "react-redux";
import { getMeat, setValues } from "../../store/shop/shopSlice";
import { useNavigate } from "react-router-dom";

const CollectionItem = ({ name, image_before: image, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "24px",
          mt: "8px",
          fontWeight: "600",
          textTransform: "capitalize",
          textAlign: "center",
          alignItems: "center",
          // flex:{xs:"1", md:"0"},
          "& > div": {
            cursor: "pointer",
            transition: "all ease-in-out 0.4s",
          },
          "&:hover > div": {
            filter:
              "drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.06)) drop-shadow(0px 2px 32px rgba(0, 0, 0, 0.16)) drop-shadow(2.5px 2.5px 8px rgba(18, 18, 18, 0.08))",
            background: "#6E2E02",
          },
          "&:hover .my-svg-image": {
            filter: "url(#color-filter-1)",
          },
          flex:{xs:1, md:0}
        }}
      >
        <Box
          sx={{
            background: "#fff",
            borderRadius: "8px",
            width: "72px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mb: "8px",
            boxShadow:"0px 1px 6px rgba(0, 0, 0, 0.06), 0px 2px 32px rgba(0, 0, 0, 0.16), 2.5px 2.5px 8px rgba(18, 18, 18, 0.08)",
          }}
          onClick={(e) => {
            dispatch(
              setValues({
                name: "cate",
                value: id,
              })
            );
            dispatch(getMeat());
            navigate("/retail");
          }}
        >
          <Box
            sx={{ textAlign: "center", position: "relative", width: "100%" }}
          >
            <svg width="100" height="100">
              <defs>
                <filter id="color-filter-1">
                  <feColorMatrix
                    type="matrix"
                    values="1 0 0 0 1
        0 1 0 0 1
        0 0 1 0 1
        0 0 0 1 0"
                  />
                </filter>
                <filter id="color-filter-2">
                  <feColorMatrix
                    type="matrix"
                    values="0.43 0 0 0 0.43
        0.18 0.11 0 0 0.11
        0.01 0.01 0.16 0 0.16
        0 0 0 1 0"
                  />
                </filter>
              </defs>
              <image
                x="50%"
                y="50%"
                style={{ transform: "translate(-35%, -25%)" }}
                width="40"
                height="50"
                xlinkHref={image}
                className="my-svg-image"
                filter="url(#color-filter-2)"
              />
            </svg>
          </Box>
        </Box>
        {name}
      </Box>
    </>
  );
};
const CollectionMenu = () => {
  const { collection } = useSelector((state) => state.shop);
  return (
    <Box mt="50px">
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "32px",
          textAlign: "center",
          mb: "24px",
        }}
      >
        Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: {
            xs: "24px 37px",
            md: "15px 102px",
          },
          mt: "15px",
        }}
      >
        {collection?.results?.map((item) => {
          return <CollectionItem {...item} key={item.id} />;
        })}
      </Box>
    </Box>
  );
};

export default CollectionMenu;
