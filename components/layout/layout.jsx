import React from "react";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
const layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
