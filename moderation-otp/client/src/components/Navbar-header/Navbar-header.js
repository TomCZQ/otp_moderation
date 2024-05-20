import React from "react";
import "./Style/navbar.css";
import { Link, useLocation } from "react-router-dom";

const NavbarHeader = () => {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className="navbar">
      <Link
        to="/"
        className={pathName === "/" ? "active-link-header accueil-link" : ""}
      >
        Accueil
      </Link>
      <Link
        to="/planning"
        className={
          pathName === "/plannings" ? "active-link-header plannings-link" : ""
        }
      >
        Plannings
      </Link>
      <Link
        to="/modos"
        className={
          pathName === "/moderateurs"
            ? "active-link-header moderateurs-link"
            : "propos-link"
        }
      >
        Modos
      </Link>
    </div>
  );
};

export default NavbarHeader;
