import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../common/Navbar"));

const Layout = ({ children }) => {
  return (
    <>
      
            
      <Suspense><Navbar/></Suspense>
      <div style={{ paddingTop: '50px' }} className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;