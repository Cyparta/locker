import React, { useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  Typography,
  Stack,
  FormControl,
  useMediaQuery,
  List,
  Drawer,
} from "@mui/material";

import "react-range-slider-input/dist/style.css";

import filterIcon from "../../assets/icons/filter.svg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import HeroTitle from "../../components/layout/heroTitle";
import ProductItem from "../../components/common/productItem";
import { useDispatch, useSelector } from "react-redux";
import { getCollection, getMeat, setValues } from "../../store/shop/shopSlice";
import SideCart from "../../components/cart/sideCart";
import RangeSlider from "../../components/common/rangeSlider";
import PageMeta from "../../components/layout/PageMeta";
import SearchProducts from "../../components/common/searchProducts";
import BasicPagination from "../../components/common/basicPagination";
import Categorey from "../../components/common/categorey";

import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Odhiha = () => {
  const { allProducts, loading, error, data, collection } = useSelector(
    (state) => state.shop
  );

  const filterCollection = collection?.results?.filter(
    (item) => item.name !== "Chicken" && item.name !== "Duck" && item.name !=="Other"
  );

  const { cate } = useSelector((state) => state.shop.data);

  const dispatch = useDispatch();

  const isTab = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    dispatch(getCollection());
    dispatch(getMeat());
    dispatch(setValues({ name: "cate", value: 1 }));
  }, [dispatch]);

  const meatFilter = [
    { id: false, name: "meat", value: "meat" },
    { id: true, name: "Alive", value: "Alive" },
  ];

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        mt: "20px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box mb="32px" sx={{ display: "flex", justifyContent: "center" }}>
        <img src={filterIcon} alt="filter icon" />
        <Typography
          sx={{
            marginLeft: "8px",
            color: "#212121",
            fontWeight: "700",
          }}
        >
          filter By
        </Typography>
      </Box>
      <List sx={{ padding: "0 15px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Categorey
            collection={filterCollection}
            cate={cate}
            type="cate"
            name="Categories"
          />
          {/* price */}
          <Box mt="24px">
            <Typography
              sx={{
                color: "#212121",
                fontSize: "16px",
                fontWeight: "700",
                mb: "10px",
              }}
            >
              Price Range :
            </Typography>
            <RangeSlider />
          </Box>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "12px", fontWeight: "500", mt: "25px" }}>
            Sort by
          </Typography>
          <FormControl sx={{ border: "none" }}>
            <Select
              value={data.ordering}
              onChange={(e) => {
                dispatch(
                  setValues({
                    name: "ordering",
                    value: e.target.value,
                  })
                );
                dispatch(getMeat());
              }}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                fieldset: { border: "none" },
                color: "#6E2E02",

                "& .MuiInputBase-input ": {
                  padding: "0",
                },
              }}
            >
              <MenuItem value="unit_price">Price : high to Low</MenuItem>
              <MenuItem value="-unit_price">Price : Low to High</MenuItem>
              <MenuItem value="A-Z">Alphabetically, A-Z</MenuItem>
              <MenuItem value="Z-A">Alphabetically, Z-A</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </List>
    </Box>
  );

  const crumbs = [
    { label: "Home", link: "/", active: false },
    { label: "Search result", link: "/shop", active: true },
  ];
  return (
    <>
      <PageMeta
        title="Grays and Danny's - products"
        desc="Shop premium meat products at Grays and Danny's. We offer high-quality beef, pork, chicken, and more, sourced from local farms and raised with care. Our meats are expertly prepared and delivered fresh to your door, so you can enjoy the best-tasting and healthiest meats available. With fast and reliable shipping, easy returns, and exceptional customer service, Grays and Danny's is your one-stop online destination for all your meat needs."
      />
      <Box sx={{ mt: "40px" }}>
        <Container>
          {/*----- GRID  ----*/}
          <Grid container spacing={4}>
            {/*---- COL 1 ---*/}
            <Grid item xs={12} md={2} lg={2}>
              <Box>
                {isTab && (
                  <>
                    {/* filter By */}
                    <Box
                      mb="32px"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <img src={filterIcon} alt="filter icon" />
                      <Typography
                        sx={{
                          marginLeft: "8px",
                          color: "#212121",
                          fontWeight: "700",
                        }}
                      >
                        filter By
                      </Typography>
                    </Box>

                    {/* ALL FILTER Categories */}
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Categorey
                        collection={filterCollection}
                        cate={cate}
                        type="cate"
                        name="Categories"
                      />
                      {/* price */}
                      <Box mt="24px" mb="40px">
                        <Typography
                          sx={{
                            color: "#212121",
                            fontSize: "16px",
                            fontWeight: "700",
                            mb: "10px",
                          }}
                        >
                          Price Range :
                        </Typography>
                        <RangeSlider />
                      </Box>
                      {/* <div className="title">Controlled</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>{value[0]}</div>
                        <div>{value[1]}</div>
                      </div>
                      <RangeSlider value={value} min={0} max={ 99999} onInput={setValue} /> */}
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
            {/*---- COL 2 ----*/}
            <Grid item xs={12} md={10} lg={10}>
              {!isTab && <SearchProducts />}
              <Box>
                {/* all products section */}
                {isTab && (
                  <Box
                    sx={{
                      background: "#EBEBEB",
                      color: "#CC8648",
                      padding: "9px",
                      borderRadius: "4px",
                    }}
                  >
                    All Products
                  </Box>
                )}

                {/* main Routes */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                  mt="15px"
                  mb="15px"
                >
                  <HeroTitle crumbs={crumbs} />
                  {isTab && (
                    <Box
                      sx={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: { xs: "wrap", sm: "nowrap" },
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{ fontSize: "12px", fontWeight: "500" }}
                        >
                          Sort by
                        </Typography>
                        <FormControl sx={{ border: "none" }}>
                          <Select
                            value={data.ordering}
                            onChange={(e) => {
                              dispatch(
                                setValues({
                                  name: "ordering",
                                  value: e.target.value,
                                })
                              );
                              dispatch(getMeat());
                            }}
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                            sx={{
                              fieldset: { border: "none" },
                              color: "#6E2E02",

                              "& .MuiInputBase-input ": {
                                padding: "0",
                              },
                            }}
                          >
                            <MenuItem value="unit_price">
                              Price : high to Low
                            </MenuItem>
                            <MenuItem value="-unit_price">
                              Price : Low to High
                            </MenuItem>
                            <MenuItem value="A-Z">Alphabetically, A-Z</MenuItem>
                            <MenuItem value="Z-A">Alphabetically, Z-A</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      {/* search products */}
                      <Box>
                        <SearchProducts />
                      </Box>
                    </Box>
                  )}
                </Stack>

                {/* {isTab && (
                  <Box
                    mb="32px"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", flex: "1" }}
                    >
                      <img
                        src={filterIcon}
                        alt="filter icon"
                        width="16px"
                        height="18px"
                      />

                      <React.Fragment key={"left"}>
                        <Typography
                          sx={{
                            marginLeft: "8px",
                            color: "#212121",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          filter By 
                        </Typography>
                      </React.Fragment>
                    </Box>
                  </Box>
                )} */}

                {/* filter By */}
                {!isTab && (
                  <Box
                    mb="32px"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", flex: "1" }}
                    >
                      <img
                        src={filterIcon}
                        alt="filter icon"
                        width="16px"
                        height="18px"
                      />

                      <React.Fragment key={"left"}>
                        <Typography
                          sx={{
                            marginLeft: "8px",
                            color: "#212121",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                          onClick={toggleDrawer("left", true)}
                        >
                          filter By
                        </Typography>
                        <Drawer
                          anchor={"left"}
                          open={state["left"]}
                          onClose={toggleDrawer("left", false)}
                        >
                          {list("left")}
                        </Drawer>
                      </React.Fragment>
                    </Box>
                  </Box>
                )}

                <Typography
                  mt="10px"
                  mb="9px"
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "rgba(33, 33, 33, 1)",
                  }}
                >
                  {allProducts?.count} Matches found
                </Typography>
                {/* all products  */}
                <Grid container spacing={2} mb="50px">
                  {loading && <Box>loading ....</Box>}
                  {error && (
                    <Box>
                      {error}
                      <ul>
                        <li>check your network</li>
                        <li>refresh your page</li>
                      </ul>
                    </Box>
                  )}
                  {allProducts?.results?.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <ProductItem {...product} w="img-cover-shop" />
                    </Grid>
                  ))}
                </Grid>

                {/* pagination */}
                {allProducts?.results > 15 && (
                  <BasicPagination allProducts={allProducts} data={data} />
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>

        {<SideCart />}
      </Box>
    </>
  );
};

export default Odhiha;
