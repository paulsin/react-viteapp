import React, { Suspense } from "react";
const AppNavbar = React.lazy(() => import("../common/AppNavbar"));

const Layout = ({ children }) => {
  return (
    <>
      
            
       <Suspense><AppNavbar /></Suspense>
      <div style={{ paddingTop: '50px' }} className="container">
        {children}
      </div>
    </>
  );
};

export default Layout;