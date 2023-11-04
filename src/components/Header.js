import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "../styles/header.scss";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigation("/login");
  };

  return (
    <header className="header">
      <h1>書籍レビュー</h1>
      {auth ? (
        <button onClick={handleSignOut} className="sign-out-button">
          サインアウト
        </button>
      ) : (
        <></>
      )}
    </header>
  );
};
