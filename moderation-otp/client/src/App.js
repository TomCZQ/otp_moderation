import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/Header.js"
import Footer from "./components/Footer.js"
import Home from "./pages/Home.js";
import Moderateurs from "./pages/Moderateurs.js";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/moderateurs" element={<Moderateurs />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;




//<Route path="/404" element=""/>
//<Route path="*" element={<Navigate replace to="/404" />} />
//<Route path="/planning" element=""/>