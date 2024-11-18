import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Moderateurs from "./pages/Moderateurs/Moderateurs";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import IndexLeagues from "./pages/IndexLeagues/IndexLeagues";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Planning from "./pages/Planning/Planning";
import "./style/app.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
};

const MainApp = () => {
  const [lastVisitedPage, setLastVisitedPage] = useState("/accueil");
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastVisitedPage", location.pathname);
  }, [location]);

  useEffect(() => {
    const storedPage = localStorage.getItem("lastVisitedPage");
    if (storedPage) {
      setLastVisitedPage(storedPage);
    }
  }, []);

  return (
    <div className="full-height">
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<PublicRoute element={Login} />} />
          <Route path="/accueil" element={<PrivateRoute element={Home} />} />
          <Route
            path="/modos"
            element={<PrivateRoute element={Moderateurs} />}
          />
          <Route
            path="/planning/:league"
            element={<PrivateRoute element={Planning} />}
          />
          <Route
            exact
            path="/planning"
            element={<PrivateRoute element={IndexLeagues} />}
          />
          <Route path="*" element={<Navigate to={lastVisitedPage} replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
