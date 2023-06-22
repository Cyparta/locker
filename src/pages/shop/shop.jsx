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
  FormControlLabel,
  Checkbox,
  Chip,
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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";

const Shop = () => {
  const { allProducts, loading, error, data, collection ,boxes,others} = useSelector(
    (state) => state.shop
  );

  const { cate } = useSelector((state) => state.shop.data);
  const [checked, setChecked] = React.useState(false);
  const [categorey,setCategory]=useState([])
  const [showboxes,setboxes]=useState([])

  const handleChange = (check) => {
    setChecked(check)
    // setboxes(collection?.results?.filter((col)=>col.others===true)) 
    dispatch(
      setValues({
        name: "cate",
        value: check ? 1 :2,
      })
    );
    dispatch(getMeat());
  };

  const dispatch = useDispatch();

  const isTab = useMediaQuery("(min-width:900px)");

  useEffect(()=>{
   
    setboxes(allProducts?.results)
    setCategory(collection?.results?.filter((col)=>col.others===false))
   },[collection,allProducts])
  useEffect(() => {
    dispatch(getMeat());
    dispatch(getCollection());
   
  },[dispatch]);
  // useEffect(() => {
  // dispatch(getMeat(cate))
  //   // setboxes([...allProducts?.results])
  //   // setboxes(collection?.results?.filter((col)=>col.others===checked)) 
    
  //   // setboxes(allProducts)
  // },[checked]);


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
  const [isExpand, setIsExpand] = useState(true);
  const [expand, setEpand] = useState(true);
  const toggleExpand = () => {
    setIsExpand(!isExpand);
    
  };
  const togglePackage = () => {
    setEpand(!expand)
    
  };

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
            collection={categorey}
            cate={cate}
            checked={checked}
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
          {/* package */}
          <Box mt="34px" mb="40px">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#212121",
                            fontSize: "16px",
                            fontWeight: "700",
                            mb: "10px",
                          }}
                        >
                          Packages
                        </Typography>
                        {expand ? (
                          <KeyboardArrowDownIcon
                            onClick={togglePackage}
                            sx={{ cursor: "pointer" }}
                          />
                        ) : (
                          <KeyboardArrowRightIcon
                            onClick={togglePackage}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </Box>
                      {expand ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                            checked={checked}
                            onChange={(e)=>{handleChange(e.target.checked)}}
                           inputProps={{ 'aria-label': 'controlled' }}
                              sx={{
                                color: "#8F5147",
                                "&.Mui-checked": {
                                  color: "#8F5147",
                                },
                              }}
                            />
                          }
                          label="Yes"
                        />
                      ) : null}
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
        title="Papineau Locker - products"
        desc="Shop premium meat products at Papineau Locker. We offer high-quality beef, pork, chicken, and more, sourced from local farms and raised with care. Our meats are expertly prepared and delivered fresh to your door, so you can enjoy the best-tasting and healthiest meats available. With fast and reliable shipping, easy returns, and exceptional customer service, Papineau Locker is your one-stop online destination for all your meat needs."
      />
      <Box sx={{ mt: "16px", ml: "5%" }}>
        <HeroTitle crumbs={crumbs} />
      </Box>
      <Box sx={{ mt: "40px", mx: "5%" }}>
        {/*----- GRID  ----*/}
        <Grid container spacing={4}>
          {/*---- COL 1 ---*/}
          <Grid item xs={12} md={2} lg={2}>
            <Box>
              {isTab && (
                <Box>
                  {/* filter By */}
                  <Box
                    mb="32px"
                    sx={{ display: "flex", justifyContent: "start" }}
                  >
                    <img src={filterIcon} alt="filter icon" />
                    <Typography
                      sx={{
                        fontSize: "14",
                        color: "#212121",
                        fontWeight: "600",
                      }}
                    >
                      filter By
                    </Typography>
                  </Box>

                  {/* ALL FILTER Categories */}
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Categorey
                      collection={categorey}
                      cate={cate}
                      checked={checked}
                      type="cate"
                      name="Categories"
                    />
                    {/* price */}
                    <Box mt="24px">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#212121",
                            fontSize: "16px",
                            fontWeight: "700",
                            mb: "10px",
                          }}
                        >
                          Price Range
                        </Typography>
                        {isExpand ? (
                          <KeyboardArrowDownIcon
                            onClick={(e) => toggleExpand(e)}
                            sx={{ cursor: "pointer" }}
                          />
                        ) : (
                          <KeyboardArrowRightIcon
                            onClick={toggleExpand}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </Box>
                      {isExpand ? <RangeSlider /> : null}
                    </Box>
                    <Box mt="34px" mb="40px">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#212121",
                            fontSize: "16px",
                            fontWeight: "700",
                            mb: "10px",
                          }}
                        >
                          Packages
                        </Typography>
                        {expand ? (
                          <KeyboardArrowDownIcon
                            onClick={togglePackage}
                            sx={{ cursor: "pointer" }}
                          />
                        ) : (
                          <KeyboardArrowRightIcon
                            onClick={togglePackage}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </Box>
                      {expand ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                            checked={checked}
                            onChange={(e)=>{handleChange(e.target.checked)}}
                           inputProps={{ 'aria-label': 'controlled' }}
                              sx={{
                                color: "#8F5147",
                                "&.Mui-checked": {
                                  color: "#8F5147",
                                },
                              }}
                            />
                          }
                          label="Yes"
                        />
                      ) : null}
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
                </Box>
              )}
            </Box>
          </Grid>
          {/*---- COL 2 ----*/}
          <Grid item xs={12} md={10} lg={10}>
            {/* {!isTab && <SearchProducts />} */}
            <Box>
              {/* all products section */}
              {/* {isTab && (
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
              )} */}

              {/* main Routes */}
              <Stack
                direction={{ xs: "column", md: "row" }}
                mb="15px"
                mr="5%"
                sx={{width:"100%"}}
              >
                {isTab && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent:"space-between",
                      width:"100%",
                      mb:"32px",
                      gap: "10px",
                      flexWrap: { xs: "wrap", sm: "nowrap" },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#9D9D9D",
                        textAlign: "start",
                      }}
                    >
                      {allProducts?.count} Matches found
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row"}}>
                      <Typography sx={{ fontSize: "12px", fontWeight: "500" }}>
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
                            color: "#9B1D08",

                            "& .MuiInputBase-input ": {
                              padding: "0",
                              ml: "2px",
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
                    {/* <Box>
                      <SearchProducts />
                    </Box> */}
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
                
                {showboxes?.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <ProductItem {...product} w="img-cover-shop" />
                  </Grid>
                ))}
              </Grid>

              {/* pagination */}
              {showboxes?.length > 15 && (
                <BasicPagination allProducts={allProducts} data={data} />
              )}
            </Box>
          </Grid>
        </Grid>

        {<SideCart />}
      </Box>
    </>
  );
};

export default Shop;
