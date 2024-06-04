import React from "react";
import "./Style/header.css";
import logo from "../../assets/logo_mode_otp.png";
import NavbarHeader from "../Navbar-header/Navbar-header.js";
import { useAuth } from "../AuthContext/AuthContext";
import UserProfile from "../UserProfile/UserProfile.js";
import Drawer from "../Drawer/Drawer.js";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="header">
      {isAuthenticated ? (
        <div className="nav">
          <NavbarHeader className="navbar-desktop navbar" />{" "}
          <Drawer className="drawer-mobile" anchor={"right"} />{" "}
        </div>
      ) : (
        ""
      )}
      <div className="title">
        <h1>Modération OTP</h1>
        <img src={logo} className="logo" alt="logo modération otp"></img>
      </div>
      {isAuthenticated ? <UserProfile /> : ""}
    </header>
  );
}
