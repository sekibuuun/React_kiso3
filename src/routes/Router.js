import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "../components/SignUp";
import { LogIn } from "../components/LogIn";
import { Home } from "../components/Home";
import { Root } from "../components/Root";
import { EditProfile } from "../components/EditProfile";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        {auth ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<EditProfile />} />
          </>
        ) : (
          <Route path="/" element={<Root />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
