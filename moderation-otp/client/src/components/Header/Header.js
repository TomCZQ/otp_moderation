import React from 'react';
import "./Style/header.css"
import logo from '../../assets/logo_mode_otp.png';
import { Link, useLocation } from 'react-router-dom';
import Dropdown from '../Dropdown/Dropdown.js'
import NavbarHeader from '../Navbar-header/Navbar-header.js';

export default function Header(){

    const location = useLocation();
    const pathName = (location.pathname);

    return(

        <header className="header">
            <Link to="/" className= {pathName === '/' ? 'active-link-header logo-header-link' : "logo-header-link"}><img src={logo} className="logo-mode-otp" alt='Logo modération OTP'></img></Link>
            <h1> Modération OTP</h1>
            <Dropdown description={<NavbarHeader />} dropdownName= "Menu"/> 
                
            

        </header>       
    )
}

