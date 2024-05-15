import React from 'react';
import "./Style/footer.css";
import logo from '../../assets/logo_mode_otp.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();
    const pathName = location.pathname;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer>
            <Link to="/" className={pathName === '/' ? 'active-link-header logo-header-link' : "logo-header-link"}>
                <img src={logo} className="logo-mode-otp" alt='Logo modération OTP'></img>
            </Link>
            <div className='navbar'>
                <Link onClick={scrollToTop}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </Link>
                <Link to="/a-propos" className={pathName === '/moderateurs' ? 'active-link-header propos-link' : "propos-link"}>A propos</Link>
            </div> 
        </footer>       
    );
}
