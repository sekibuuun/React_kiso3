import React from "react";
import "../styles/pagenation.scss";

const Pagenation = ({ pageNumber, prevPage, nextPage }) => {
  return (
    <div className="pagenation">
      <button onClick={() => prevPage()}>＜</button>
      <span>　{pageNumber + 1}　</span>
      <button onClick={() => nextPage()}>＞</button>
    </div>
  );
};

export { Pagenation };
