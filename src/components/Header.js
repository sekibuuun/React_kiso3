import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "../styles/header.scss";
import axios from "axios";
import { url } from "../const";
import { EditProfile } from "./EditProfile";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");

  const handleSignIn = () => {
    navigation("/login");
  };

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigation("/");
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => setUserName(res.data.name))
      .catch((err) => {
        setErrorMessage(`タスクの取得に失敗しました。${err}`);
      });
  }, []); // Add an empty dependency array to useEffect

  return (
    <header className="header">
      <h1>書籍レビュー</h1>
      {auth ? (
        <div className="after-signin">
          <div className="user-name">{userName}</div>
          <div onClick={() => navigation("/profile")} className="edit-button">
            ユーザー情報編集
          </div>
          <div onClick={handleSignOut} className="sign-out-button">
            サインアウト
          </div>
        </div>
      ) : (
        <div onClick={handleSignIn} className="sign-in-button">
          ログイン
        </div>
      )}
    </header>
  );
};
