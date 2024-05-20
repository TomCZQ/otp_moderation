import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style/IndexLeagues.css";
import LogoLFL from "../../assets/ligues/LFL.png";
import LogoLEC from "../../assets/ligues/LEC.png";
import LogoLCK from "../../assets/ligues/lck.png";

export default function IndexLeagues() {
  const navigate = useNavigate();

  const handleLeagueClick = (league) => {
    navigate(`/planning/${league}`);
  };

  return (
    <div className="link-container">
      <h2>Plannings</h2>
      <div
        onClick={() => handleLeagueClick("lec")}
        className="league-container"
      >
        LEC <img src={LogoLEC} alt="LEC" />
      </div>
      <div
        onClick={() => handleLeagueClick("lfl")}
        className="league-container"
      >
        LFL <img src={LogoLFL} alt="LFL" />
      </div>
      <div
        onClick={() => handleLeagueClick("lck")}
        className="league-container"
      >
        LCK <img src={LogoLCK} alt="LCK" />
      </div>
      <div
        onClick={() => handleLeagueClick("div2")}
        className="league-container"
      >
        DIV 2
      </div>
    </div>
  );
}
