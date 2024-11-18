import "./Style/loader.scss";
import logo from "../../assets/logo_mode_otp.png";
import React from "react";

export default function Loader() {
  return (
    <div className="loader">
      <img src={logo} className="rotating" alt="logo OTP" />
    </div>
  );
}
