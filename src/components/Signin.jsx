import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import Netflix from "../images/red-netflix-logo-text-png-3.png";
import { auth, googleAuth } from "./firbase/setup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      setTimeout(() => {
        auth.currentUser?.emailVerified && navigate("/");
      }, 2000);
      toast.success("SignedIn succesfully");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser);

  return (
    <div
      style={{ backgroundColor: "#181818", height: "100vh", padding: "20px" }}
    >
      <ToastContainer autoClose={2000} />
      <img style={{ width: "80px", height: "30px" }} src={Netflix} />
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignin} variant="contained" color="error">
          Signin with google
        </Button>
        <br />
        <h2 style={{ color: "#D4D4D4D4" }}>
          Lets start <br />
          to explore movies
          <br /> from here.
        </h2>
      </div>
    </div>
  );
};

export default Signin;
