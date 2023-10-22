import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { signIn } from "../authSlice";
import { url } from "../const";
import Compressor from "compressorjs";

const SignUp = () => {
  const navigation = useNavigate();
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [iconFile, setIconFile] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleIconChange = (e) => {
    const file = e.target.files[0];
    new Compressor(file, {
      quality: 0.6,
      height: 100,
      width: 100,
      success(result) {
        setIconFile(result);
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          setIcon(reader.result);
        };
      },
      error() {
        setErrorMessage("アイコンのアップロードに失敗しました。");
      },
    });
  };

  const onSignUp = () => {
    const data = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post(`${url}/users`, data)
      .then((res) => {
        const token = res.data.token;
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const formData = new FormData();
        formData.append("icon", iconFile);

        axios.post(`${url}/uploads`, formData, { headers });
        dispatch(signIn());
        setCookie("token", token);
        navigation("/");
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。 ${err}`);
      });

    if (auth) return <Navigate to="/" />;
  };
  return (
    <div>
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form">
          <label>メールアドレス</label>
          <br />
          <input
            type="email"
            onChange={handleEmailChange}
            className="email-input"
          />
          <br />
          <label>アイコン</label>
          <br />
          <input
            type="file"
            onChange={handleIconChange}
            className="icon-input"
          />
          {icon && <img src={icon} alt="icon" className="icon" />}
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            type="text"
            onChange={handleNameChange}
            className="name-input"
          />
          <br />
          <label>パスワード</label>
          <br />
          <input
            type="password"
            onChange={handlePasswordChange}
            className="password-input"
          />
          <br />
          <button type="button" onClick={onSignUp} className="signup-button">
            作成
          </button>
        </form>
      </main>
    </div>
  );
};

export { SignUp };
