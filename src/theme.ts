import { createTheme } from "@mui/material";

// extend paper theme to have card variant
declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    card: true;
    dialog_card: true;
    filled: true;
    available: true;
    stair: true;
  }
}

const themeSetting = {
  palette: {
    primary: {
      main: "#5D87FF",
      light: "#ECF2FF",
      dark: "#4570EA",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#49BEFF",
      light: "#E8F7FF",
      dark: "#23afdb",
      contrastText: "#ffffff",
    },
    success: {
      main: "#13DEB9",
      light: "#E6FFFA",
      dark: "#02b3a9",
      contrastText: "#ffffff",
    },
    info: {
      main: "#539BFF",
      light: "#EBF3FE",
      dark: "#1682d4",
      contrastText: "#ffffff",
    },
    error: {
      main: "#FA896B",
      light: "#FDEDE8",
      dark: "#f3704d",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#FFAE1F",
      light: "#FEF5E5",
      dark: "#ae8e59",
      contrastText: "#ffffff",
    },
    cardBackground: {
      main: "#ffffff",
    },
    text: {
      primary: "#2A3547",
      secondary: "#5A6A85",
    },
    divider: "#e5eaef",
    background: {
      default: "#F2F6FA",
    },
    sidebar: {
      background: "#121621",
      color: "#ffffff",
      link: "#b3b9c6",
    },
    dataGrid: {
      headerColor: "#2A3547",
      rowColor: "#2A3547",
      selectedRowColor: "#ffffff",
      selectedRowBackground: "#5D87FF",
      border: "#e5eaef",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontSize: 14,
    fontWeight: 400,
    p: {
      fontSize: "1rem",
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
    h1: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 14,
    },
    subtitle2: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 20,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 14,
        },
      },
      variants: [
        {
          props: { variant: "h2" as "h2" },
          style: {
            fontSize: "32px",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "h1" as "h1" },
          style: {
            fontSize: "40px",
            fontWeight: "600",
          },
        },
        {
          props: { variant: "h3" as "h3" },
          style: {
            fontSize: "24px",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "h4" as "h4" },
          style: {
            fontSize: "20px",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "h5" as "h5" },
          style: {
            fontSize: "16px",
            fontWeight: "500",
          },
        },
        {
          props: { variant: "h6" as "h6" },
          style: {
            fontSize: "14px",
            fontWeight: "500",
            margin: "0px !important",
          },
        },
        {
          props: { variant: "subtitle2" as "subtitle2" },
          style: {
            fontSize: "12px",
            fontWeight: "500",
          },
        },
      ],
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: "card" as "card" },
          style: {
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0px 15px 35px 0px rgba(26, 35, 47, 0.21)",
            marginBottom: "16px",
          },
        },
        {
          props: { variant: "filled" as "filled" },
          style: {
            width: "40px",
            height: "40px",
            borderRadius: "4px",
            backgroundColor: "#13DEB9",
            boxShadow: "0px 15px 35px 0px rgba(26, 35, 47, 0.21)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          props: { variant: "available" as "available" },
          style: {
            width: "40px",
            height: "40px",
            borderRadius: "4px",
            backgroundColor: "#539BFF",
            boxShadow: "0px 15px 35px 0px rgba(26, 35, 47, 0.21)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
        {
          props: { variant: "stair" as "stair" },
          style: {
            // width: "150px",
            height: "560px",
            backgroundColor: "#ddd",
            boxShadow: "0px 1px 5px 0px rgba(26, 35, 47, 0.21)",
          },
        },
        {
          props: { variant: "dialog_card" as "dialog_card" },
          style: {
            width: "100%",
            padding: "24px",
            borderRadius: "8px",
            maxHeight: "90vh",
            boxShadow: "0px 15px 35px 0px rgba(26, 35, 47, 0.21)",
            display: "flex",
            "flex-direction": "column",
            overflow: "auto",
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: "500",
          fontSize: "15px",
          borderRadius: "8px",
          "text-transform": "unset",
        },
      },
    },
  },
};

const theme = createTheme(themeSetting);

export default theme;
