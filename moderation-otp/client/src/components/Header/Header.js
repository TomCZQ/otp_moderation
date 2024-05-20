import React from "react";
import "./Style/header.css";
import logo from "../../assets/logo_mode_otp.png";

import Dropdown from "../Dropdown/Dropdown.js";
import NavbarHeader from "../Navbar-header/Navbar-header.js";
import { useAuth } from "../AuthContext/AuthContext";
import UserProfile from "../UserProfile/UserProfile.js";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <Dropdown
        description={<NavbarHeader />}
        dropdownName="Menu"
        src={logo}
        alt="Logo modération OTP"
      />

      <h1>Modération OTP</h1>
      {isAuthenticated ? (
        <div>
          <UserProfile />
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
