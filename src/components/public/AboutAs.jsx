import React from 'react'
import logo_agentfree from '../../images/logo_agentfree.jpeg';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const AboutAs = () => {
  return (
    <>
    <Navbar/>
    <div class="container text-center p-5 mt-5">
        <img src={logo_agentfree} width="280px" height="180px"/>
    </div>
    <div class="container p-2">
    <h3>About us</h3>
    <p>A realestate company with more than 10 years of experience and satisfied customers from from all over the world, which will help you to find your dream home in an easy way.</p>
</div> 
    <Footer/>
    </>
  )
}

export default AboutAs