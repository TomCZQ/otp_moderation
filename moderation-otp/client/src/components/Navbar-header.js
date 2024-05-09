import React from "react";
import "../style/navbar.css";
import { Link, useLocation } from 'react-router-dom';

const NavbarHeader = () => {

    const location = useLocation();
    const pathName = (location.pathname);

  return (
    <div className= 'navbar'>
        <Link to="/" className= {pathName === '/' ? 'active-link-header accueil-link' : ""}>Planning</Link>
        <Link to="/moderateurs" className=  {pathName === '/moderateurs' ? 'active-link-header moderateurs-link' : "propos-link"}>Modérateurs</Link>
    </div>
  );
}

export default NavbarHeader; 
