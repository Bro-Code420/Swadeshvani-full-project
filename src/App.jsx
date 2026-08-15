import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./Component/navbar.jsx";
import Home from "./Component/Home";
import News from "./Component/News.jsx";
import Education from "./Component/Education.jsx";
import Worldnews from "./Component/Worldnews.jsx";
import Technologynews from "./Component/Technologynews.jsx";
import Sportsnews from "./Component/Sportsnews.jsx";
import Login from "./Component/Login.jsx";
import HistoricJharkhand from "./Component/HistoricJharkhand.jsx";
import Admin from "./Component/Admin.jsx";
import YouTubeVideos from "./Component/YouTubeVideos.jsx";
import Advertisement from "./Component/Sponsors.jsx";
import Footer from "./Component/Footer.jsx";
import About from "./Component/About.jsx";
import TermsConditions from "./Component/TermsConditions.jsx";
import PrivacyPolicy from "./Component/LegalPrivacy.jsx";
function AppLayout() {
  const location = useLocation();

  // Hide public Navbar and Footer on the admin page
  const isAdminPage =
    location.pathname.toLowerCase() === "/admin";

  return (
    <div className="min-h-screen">
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/News" element={<News />} />
        <Route path="/Education" element={<Education />} />
        <Route path="/Worldnews" element={<Worldnews />} />
        <Route path="/Technologynews" element={<Technologynews />} />
        <Route path="/Sportsnews" element={<Sportsnews />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/About" element={<About />} />
        <Route path="/t&c" element={<TermsConditions />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route
          path="/HistoricJharkhand"
          element={<HistoricJharkhand />}
        />
        <Route path="/Admin" element={<Admin />} />
        <Route
          path="/YouTubeVideos"
          element={<YouTubeVideos />}
        />
        <Route
          path="/Advertisement"
          element={<Advertisement />}
        />
      </Routes>

      {!isAdminPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;