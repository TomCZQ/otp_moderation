import React from 'react';
import "../style/header.css"
import logo from '../assets/logo_mode_otp.png';
import { Link, useLocation } from 'react-router-dom';


export default function Footer(){
    const location = useLocation();
    const pathName = (location.pathname);

    return(

        <header className="header">
            <Link to="/" className= {pathName === '/' ? 'active-link-header logo-header-link' : "logo-header-link"}><img src={logo} className="logo-mode-otp" alt='Logo modération OTP'></img></Link>
            <div className='navbar'>
                <Link to="/" className= {pathName === '/' ? 'active-link-header accueil-link' : ""}>Accueil</Link>
                <Link to="/a-propos" className=  {pathName === '/moderateurs' ? 'active-link-header propos-link' : "propos-link"}>A propos</Link>
            </div> 
        </header>       
    )
}