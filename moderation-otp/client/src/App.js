import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header.js"
import Footer from "./components/Footer/Footer.js"
import Home from "./pages/Home.js";
import Moderateurs from "./pages/Moderateurs.js";
import Schedule from "./pages/Schedule.js"
import LoginButton from './components/Loginbutton/Loginbutton.js';
import Planning from "./pages/Planning.js"

import Login from "./"

function App() {
  return (
    <Router>
      <Header />
      <LoginButton />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moderateurs" element={<Moderateurs />} />
          <Route path="/plannings" element={<Planning/>}/>         
                        
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

// 