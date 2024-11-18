import React from "react";
import "../Footer/Style/footer.scss";
import logo from "../../assets/logo_mode_otp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const pathName = location.pathname;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer>
      <img src={logo} className="logo-mode-otp" alt="Logo modération OTP"></img>

      <p className="copyrights">©Tom</p>
      <div className="back-to-top">
        <Link onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </Link>
      </div>
    </footer>
  );
}
