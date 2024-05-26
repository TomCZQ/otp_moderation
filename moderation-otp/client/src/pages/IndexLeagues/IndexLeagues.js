import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style/IndexLeagues.css";
import LogoLFL from "../../assets/lfl.png";
import LogoLEC from "../../assets/lec.png";
import LogoLCK from "../../assets/lck.png";
import LogoDIV2 from "../../assets/div2.png";
import LogoWorlds from "../../assets/worlds.png";

export default function IndexLeagues() {
  const navigate = useNavigate();

  const handleLeagueClick = (league) => {
    navigate(`/planning/${league}`);
  };

  return (
    <div className="container">
      <h2>Plannings</h2>
      <div className="link-container">
        <div
          onClick={() => handleLeagueClick("lfl")}
          className="league-container lfl"
        >
          <img src={LogoLFL} alt="logo LFL" />
        </div>
        <div
          onClick={() => handleLeagueClick("lec")}
          className="league-container lec"
        >
          <img src={LogoLEC} alt="logo LEC" />
        </div>

        <div
          onClick={() => handleLeagueClick("lck")}
          className="league-container lck"
        >
          <img
            src={LogoLCK}
            alt="logo LCK"
            className="les-assets-de-bixente-cest-de-la-merde"
          />
        </div>
        <div
          onClick={() => handleLeagueClick("div2")}
          className="league-container"
        >
          <img src={LogoDIV2} alt="logo LCK" />
        </div>
        <div
          onClick={() => handleLeagueClick("worlds")}
          className="league-container"
        >
          <img src={LogoWorlds} alt="logo WORLDS" />
        </div>
      </div>
    </div>
  );
}
