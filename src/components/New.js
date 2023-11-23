import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { url } from "../const";
import { Header } from "./Header";
import "../styles/new.scss";

const New = () => {
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [detailurl, setDetailUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setDetailUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);

  const data = {
    title: title,
    url: detailurl,
    detail: detail,
    review: review,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const Post = () => {
    axios
      .post(`${url}/books`, data, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        console.log(data);
        navigation("/home");
      })
      .catch((err) => {
        setErrorMessage(`レビューの投稿に失敗しました。${err}`);
      });
  };

  const onSubmit = () => {
    Post();
  };

  return (
    <div>
      <Header />
      <main className="new">
        <h2>レビュー投稿</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="title-label" htmlFor="input-title">
            タイトル
          </label>
          <br />
          <input
            {...register("title", {
              required: {
                value: true,
                message: "タイトルを入力してください。",
              },
              maxLength: {
                value: 30,
                message: "タイトルは30文字以内で入力してください。",
              },
            })}
            className="title-input"
            id="input-title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
          {errors.title && (
            <span className="title-error">{errors.title.message}</span>
          )}
          <br />
          <label className="url-label" htmlFor="input-url">
            URL
          </label>
          <br />
          <input
            {...register("url", {
              required: {
                value: true,
                message: "URLを入力してください。",
              },
              pattern: {
                value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm,
                message: "URLの形式で入力してください。",
              },
            })}
            className="url-input"
            id="input-url"
            type="text"
            value={detailurl}
            onChange={handleUrlChange}
          />
          {errors.url && (
            <span className="url-error">{errors.url.message}</span>
          )}
          <br />
          <label className="detail-label" htmlFor="input-detail">
            感想
          </label>
          <br />
          <textarea
            {...register("detail", {
              required: {
                value: true,
                message: "感想を入力してください。",
              },
              maxLength: {
                value: 300,
                message: "感想は300文字以内で入力してください。",
              },
            })}
            className="detail-input"
            id="input-detail"
            type="text"
            value={detail}
            onChange={handleDetailChange}
          />
          {errors.detail && (
            <span className="detail-error">{errors.detail.message}</span>
          )}
          <br />
          <label className="review-label" htmlFor="input-review">
            評価
          </label>
          <br />
          <textarea
            {...register("review", {
              required: {
                value: true,
                message: "評価を入力してください。",
              },
              maxLength: {
                value: 300,
                message: "評価は300文字以内で入力してください。",
              },
            })}
            className="review-input"
            id="input-review"
            value={review}
            onChange={handleReviewChange}
          />
          {errors.review && (
            <span className="review-error">{errors.review.message}</span>
          )}
          <br />
          <button className="submit-button" type="submit">
            投稿
          </button>
        </form>
      </main>
    </div>
  );
};

export { New };
