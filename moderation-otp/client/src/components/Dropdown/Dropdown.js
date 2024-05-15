import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./Style/dropdown.css";

function Dropdown(props) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {props.dropdownName}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`chevron-dropdown ${
            isOpen ? "rotate chevron-dropdown" : "chevron-dropdown"
          }`}
        />
      </button>
      <div
        className={`dropdown-content ${
          isOpen ? "open dropdown-content" : "dropdown-content"
        }`}
      >
        <div className="content">{props.description}</div>
      </div>
    </div>
  );
}

export default Dropdown;
