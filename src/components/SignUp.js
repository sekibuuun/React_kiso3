import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { signIn } from "../authSlice";
import { url } from "../const";
import { Header } from "./Header";
import Compressor from "compressorjs";
import "../styles/signUp.scss";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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

  const onSignUp = (test) => {
    axios
      .post(`${url}/users`, test)
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
        navigation("/home");
      })
      .catch((err) => {
        setErrorMessage(`サインアップに失敗しました。 ${err}`);
      });
  };

  const onSubmit = (test) => {
    onSignUp();
    reset();
  };

  if (auth) return <Navigate to="/home" />;

  return (
    <div>
      <Header />
      <main className="signup">
        <h2>新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
          <label>メールアドレス</label>
          <br />
          <input
            {...register("email", {
              required: {
                value: true,
                message: "メールアドレスを入力してください。",
              },
              pattern: {
                value:
                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                message: "メールアドレスの形式で入力してください。",
              },
            })}
            onChange={handleEmailChange}
            className="email-input"
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br />
          <label>アイコン</label>
          <br />
          <input
            {...register("icon", {
              required: {
                value: true,
                message: "アイコンを選択してください。",
              },
            })}
            type="file"
            onChange={handleIconChange}
            className="icon-input"
          />
          {icon && <img src={icon} alt="icon" className="icon" />}
          {errors.icon && (
            <span>
              <br />
              {errors.icon.message}
            </span>
          )}
          <br />
          <label>ユーザ名</label>
          <br />
          <input
            {...register("name", {
              required: {
                value: true,
                message: "ユーザ名を入力してください。",
              },
              maxLength: {
                value: 20,
                message: "ユーザ名は20文字以内で入力してください。",
              },
            })}
            type="text"
            onChange={handleNameChange}
            className="name-input"
          />
          {errors.name && <span>{errors.name.message}</span>}
          <br />
          <label>パスワード</label>
          <br />
          <input
            {...register("password", {
              required: {
                value: true,
                message: "パスワードを入力してください。",
              },
              maxLength: {
                value: 20,
                message: "パスワードは20文字以内で入力してください。",
              },
            })}
            type="password"
            onChange={handlePasswordChange}
            className="password-input"
          />
          {errors.password && <span>{errors.password.message}</span>}
          <br />
          <button type="submit" className="signup-button">
            作成
          </button>
        </form>
        <Link to="/login">ログインはこちら</Link>
      </main>
    </div>
  );
};

export { SignUp };
