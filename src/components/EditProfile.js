import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { url } from "../const";
import { Header } from "./Header";
import "../styles/editProfile.scss";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigation = useNavigate();

  const onUpdateName = () => {
    const data = { name: name };
    axios
      .put(`${url}/users`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        console.log(name);
        navigation("/home");
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="edit-profile">
        <label htmlFor="input-name">ユーザーネーム編集</label>
        <input
          type="text"
          id="input-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={onUpdateName}>更新</button>
      </div>
    </div>
  );
};

export { EditProfile };
