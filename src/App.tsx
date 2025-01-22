import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import HotelDesign from "./screens/HotelDesign";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <HotelDesign />
      <ToastContainer
        position="bottom-right"
        theme="light"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        stacked
      />
      <Backdrop id="sm-loader" sx={{ zIndex: 999999 }} open={false}>
        <CircularProgress color="primary" />
      </Backdrop>
    </>
  );
};

export default App;
