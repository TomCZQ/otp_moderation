import React from "react";
import "./Style/header.css";
import logo from "../../assets/logo_mode_otp.png";
import useMediaQuery from "../useMediaQuery/useMediaQuery.js";
import Drawer from "../../components/Drawer/Drawer.js";
import NavbarHeader from "../Navbar-header/Navbar-header.js";
import { useAuth } from "../AuthContext/AuthContext";
import UserProfile from "../UserProfile/UserProfile.js";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const isMobile = useMediaQuery("max-width: 768px");
  return (
    <header className="header">
      {isAuthenticated ? <NavbarHeader /> : ""}
      <div className="title">
        <h1>Modération OTP</h1>
        <img src={logo} className="logo" alt="logo modération otp"></img>
      </div>
      {isAuthenticated ? <UserProfile /> : ""}
    </header>
  );
}
