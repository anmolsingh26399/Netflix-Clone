import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Main from "./components/Main.jsx";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin.jsx";
import MovieDetail from "./components/MovieDetail.jsx";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/movieDetail" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default App;
