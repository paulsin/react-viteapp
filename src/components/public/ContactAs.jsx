import React from 'react'
import logo_agentfree from '../../images/logo_agentfree.jpeg';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

import WhatsAppBlack from '../../assets/icons/whatsapp-black.svg?react';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';

const ContactAs = () => {
  return (
    <>
    <Navbar/>
    <div class="container text-center p-5 mt-5">
        <img src={logo_agentfree} width="280px" height="180px"/>
    </div>
    <div class="container  p-3 pb-4">
    <h3>Contact us</h3><br/>

     
        <div id="linktagsincontactas">
        <Phone size={22} className="text-black-500" />&nbsp;&nbsp;&nbsp;+91 - 9188 338 732<br/><br/>
        <WhatsAppBlack className="text-black-500" width={18} height={18}/>&nbsp;&nbsp;&nbsp;+91 - 9188 338 732<br/><br/>
        <Mail size={22} className="text-black-600" />&nbsp;&nbsp;agentfreedeal@gmail.com<br/><br/>
        <MapPin size={20} className="text-red-500" />&nbsp;&nbsp;&nbsp;Kochi, Kerala, India</div>
      
 
    </div> 
    <Footer/>
    </>
  )
}

export default ContactAs