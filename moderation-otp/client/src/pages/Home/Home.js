import React from "react";
import { useState } from "react";
import "./Style/home.css";
import bixente from "../../assets/bixente_asset.jpg";

const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="body">
      <h2>Accueil</h2>
      <img src={bixente}></img>
    </div>
  );
};

export default Home;
