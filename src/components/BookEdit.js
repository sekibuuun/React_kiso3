import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { url } from "../const";
import { useCookies } from "react-cookie";
import { Header } from "./Header";
import "../styles/bookEdit.scss";

const BookEdit = () => {
  const navigation = useNavigate();
  const { id } = useParams();
  const [cookies] = useCookies();
  const [book, setBook] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [detailurl, setDetailUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setDetailUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onUpdateBook = () => {
    const data = {
      title: title,
      url: url,
      detail: detail,
      review: review,
    };
    axios
      .put(`${url}/books/${id}`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation("/home");
      })
      .catch((err) => {
        setErrorMessage(`更新に失敗しました。${err}`);
      });
  };

  const onDeleteBook = () => {
    axios
      .delete(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation("/home");
      })
      .catch((err) => {
        setErrorMessage(`削除に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setTitle(res.data.title);
        setDetailUrl(res.data.url);
        setDetail(res.data.detail);
        setReview(res.data.review);
        // ログを送信する
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  const onSubmit = () => {
    onUpdateBook();
    reset();
  };

  return (
    <div>
      <Header />
      <main className="new">
        <h2>レビュー編集</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="title-label" htmlFor="input-title">
            タイトル
          </label>
          <br />
          <input
            className="title-input"
            id="input-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          <label className="url-label" htmlFor="input-url">
            URL
          </label>
          <br />
          <input
            className="url-input"
            id="input-url"
            type="text"
            value={detailurl}
            onChange={handleUrlChange}
          />
          <label className="detail-label" htmlFor="input-detail">
            感想
          </label>
          <br />
          <textarea
            className="detail-input"
            id="input-detail"
            type="text"
            value={detail}
            onChange={handleDetailChange}
          />
          <label className="review-label" htmlFor="input-review">
            評価
          </label>
          <br />
          <textarea
            className="review-input"
            id="input-review"
            value={review}
            onChange={handleReviewChange}
          />
          <div className="buttons">
            <button className="submit-button" type="submit">
              編集
            </button>
            <button className="delete-button" onClick={onDeleteBook}>
              削除
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export { BookEdit };
