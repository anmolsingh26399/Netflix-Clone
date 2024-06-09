import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Netflix from "../images/red-netflix-logo-text-png-3.png";
import { Button } from "@mui/material";
import { auth } from "./firbase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";

const Navbar = () => {
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const getMovies = async () => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=b9e68a32b794075281e7bbb1c29ed10a"
      );
      const json = await res.json();
      setMovies(json.results);
    } catch (err) {
      console.log(err);
    }
  };

  const signinClick = () => {
    navigate("/signin");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Loggedout successfully", {
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);

  console.log(auth.currentUser?.email);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[16]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <ToastContainer authoClose={2000} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <img src={Netflix} style={{ width: "60px", height: "30px" }} />
        {auth.currentUser?.emailVerified ? (
          <Button
            onClick={logout}
            variant="contained"
            color="error"
            sx={{ height: "40px", marginLeft: "10px" }}
          >
            LOGOUT
          </Button>
        ) : (
          <Button
            onClick={signinClick}
            color="error"
            variant="contained"
            sx={{ height: "40px" }}
          >
            SignIn
          </Button>
        )}
      </div>
      <div style={{ padding: "20px" }}>
        <h1
          style={{ color: "#F1F1F1", fontSize: "70px", fontFamily: "initial" }}
        >
          {movies[16]?.original_title}
        </h1>
        <h3 style={{ color: "#F1F1F1" }}>{movies[16]?.overview}</h3>
        {/* <Button
          variant="contained"
          sx={{ color: "black", bgcolor: "white", fontWeight: "bold" }}
        >
          Play Trailer
        </Button> */}
      </div>
    </div>
  );
};

export default Navbar;
