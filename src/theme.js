import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    test: {
      main: "#6E2E02",
    },
    test2: {
      main: "(114.83deg, #6E2E02 -19.62%, #CC8648 100%)"
    },
    test3: {
      main: "#CC8648"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    color: "#212121",
    h1: {
      color: "#212121",
      fontSize: "48px",
      fontWeight: "700",
      marginBottom: "24px",
      "@media (max-width:576px)": {
        fontSize: "24px",
      },
    },
    h3: {
      fontWeight: "700",
      fontSize: "16px",
      color: "#1D1D1D",
      "@media (min-width:576px)": {
        fontSize: "16px",
      },
      "@media (min-width:768px)": {
        fontSize: "24px",
      },
      "@media (min-width:991px)": {
        fontSize: "27px",
      },
    },
    lead: {
      fontSize: "16px",
      color: "#212121",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "500",
      marginBottom: "26px !important",
      "@media (min-width:576px)": {
        fontSize: "24px",
      },
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          maxWidth: '1250px !important',
        },
      },
    },
  },
  // components: {
  //   MuiContainer: {
  //     styleOverrides: {
  //       sm: {
  //         maxWidth: 200,
  //       },
  //       md: {
  //         maxWidth: 320,
  //       },
  //       lg: {
  //         maxWidth: 500,
  //       },
  //     },
  //   },
  // },
});
