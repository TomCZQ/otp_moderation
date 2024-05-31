import React from "react";
import "./Style/home.css";
import bixente from "../../assets/bixente_asset.jpg";

const Home = () => {
  return (
    <div className="body">
      <h2>Accueil</h2>
      <img src={bixente} alt="Proutxente fan de T1"></img>
    </div>
  );
};

export default Home;
