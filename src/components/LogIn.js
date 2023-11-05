import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { url } from "../const";
import { signIn } from "../authSlice";
import { Header } from "./Header";
import "../styles/logIn.scss";

const LogIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onLogIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigation("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  const onSubmit = () => {
    onLogIn();
    reset();
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="email-label" htmlFor="input-email">
            メールアドレス
          </label>
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
            type="text"
            onChange={handleEmailChange}
            className="email-input"
            id="input-email"
          />
          {errors.email && (
            <span className="email-error">{errors.email.message}</span>
          )}
          <br />
          <label className="password-label" htmlFor="input-password">
            パスワード
          </label>
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
            id="input-password"
            data-testid="password"
          />
          {errors.password && (
            <span className="password-error">{errors.password.message}</span>
          )}
          <br />
          <button type="submit" className="signin-button" id="input-button">
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
};

export { LogIn };
