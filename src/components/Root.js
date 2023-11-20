import React, { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Pagenation } from "../components/Pagenation";
import { url } from "../const";
import "../styles/home.scss";

const Root = () => {
  const [lists, setLists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const listsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${url}/public/books`, {
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

  const nextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 0));
  };

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
        <Pagenation
          pageNumber={pageNumber}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};

export { Root };
