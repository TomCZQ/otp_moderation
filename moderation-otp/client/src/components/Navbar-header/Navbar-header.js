import React from "react";
import "../Navbar-header/Style/navbar.css";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCalendar,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

const NavbarHeader = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="navbar">
      <Link
        to="/"
        className={
          pathName === "/accueil"
            ? "active-link-header accueil-link"
            : "accueil-link"
        }
      >
        <FontAwesomeIcon icon={faHouse} />
        ACCUEIL
      </Link>
      <Link
        to="/planning"
        className={
          pathName.startsWith("/planning")
            ? "active-link-header planning-link"
            : "planning-link"
        }
      >
        <FontAwesomeIcon icon={faCalendar} />
        PLANNING
      </Link>
      <Link
        to="/modos"
        className={
          pathName.startsWith("/modos")
            ? "active-link-header moderateurs-link"
            : "moderateurs-link"
        }
      >
        <FontAwesomeIcon icon={faShield} />
        MODOS
      </Link>
      <div className="slider"></div>
    </div>
  );
};

export default NavbarHeader;
