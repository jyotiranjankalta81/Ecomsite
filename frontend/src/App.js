import './App.css';
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webFont from "webfontloader";
import React from 'react';
import Home from "./component/Home/Home.js"



function App() {
  React.useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Drold Sans", "chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
