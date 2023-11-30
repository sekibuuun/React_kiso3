import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { url } from "../const";
import { Loading } from "./Loading";
import { useCookies } from "react-cookie";
import { Header } from "./Header";
import "../styles/bookDetail.scss";

const BookDetail = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setBook(res.data);
        setLoading(false);
        // ログを送信する
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <Header />
      <div className="error">{errorMessage}</div>
      <div className="book-detail" id={book.id}>
        <h2 className="title">{book.title}</h2>
        <div className="url-container">
          <div className="url-title">URL：</div>
          <a href={book.url} className="url">
            {book.url}
          </a>
        </div>
        <p>コメント: {book.detail}</p>
        <p>レビュワー: {book.reviewer}</p>
        <p>レビュー: {book.review}</p>
      </div>
      <button className="review-edit" onClick={() => navigation(`/edit/${id}`)}>
        編集
      </button>
    </div>
  );
};

export { BookDetail };
