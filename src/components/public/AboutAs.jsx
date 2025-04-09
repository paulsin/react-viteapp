import React, { Suspense } from "react";
const Navbar = React.lazy(() => import("../common/Navbar"));
const Footer = React.lazy(() => import('../common/Footer'));
import logo_agentfree from '../../images/logo_agentfree.jpeg';



const AboutAs = () => {
  return (
    <>
    <Suspense><Navbar/></Suspense>
    <div class="container text-center p-5 mt-5">
        <img src={logo_agentfree} width="280px" height="180px"/>
    </div>
    <div class="container p-2">
    <h3>About us</h3>
    <p>A realestate company with more than 10 years of experience and satisfied customers from from all over the world, which will help you to find your dream home in an easy way.</p>
    </div> 
  <Suspense><Footer/></Suspense> 
    </>
  )
}

export default AboutAs