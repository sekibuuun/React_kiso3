import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { url } from "../const";
import "../styles/home.scss";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  useEffect(() => {
    axios
      .get(`${url}/books`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className="home">
        {lists.map((list) => (
          <div key={list.id} className="overview">
            <h2 className="title">{list.title}</h2>
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
      </div>
    </div>
  );
};

export { Home };
