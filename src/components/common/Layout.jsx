import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '50px' }} className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;