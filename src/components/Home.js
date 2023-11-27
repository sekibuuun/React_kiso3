import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { Pagenation } from "../components/Pagenation";
import { url } from "../const";
import "../styles/home.scss";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const pageNumber = useSelector((state) => state.pageCounter.pageNumber);
  const listsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${url}/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
        params: {
          offset: String(pageNumber * listsPerPage),
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, [pageNumber]);

  const sendLog = (selectedId) => {
    const data = {
      selectBookId: selectedId,
    };
    console.log(selectedId);
    axios
      .post(`${url}/logs`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        navigation(`/detail/${selectedId}`);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <Header />
      <div className="home">
        <button onClick={() => navigation("/new")} className="new-button">
          新規投稿
        </button>
        {lists.map((list) => (
          <div key={list.id} className="overview">
            <div className="title-container">
              <h2 onClick={() => sendLog(list.id)} className="title">
                {list.title}
              </h2>
            </div>
            <div className="url-container">
              <div className="url-title">URL：</div>
              <a href={list.url} className="url">
                {list.url}
              </a>
            </div>
            <div className="reviewer-container">
              <div className="reviewer-title">レビュワー：</div>
              <div className="reviewer">{list.reviewer}</div>
            </div>
            <div className="review-container">
              <p className="review">{list.review}</p>
            </div>
          </div>
        ))}
        <Pagenation />
      </div>
    </div>
  );
};

export { Home };
