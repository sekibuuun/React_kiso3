import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/pagenation.scss";

const Pagenation = () => {
  const pageNumber = useSelector((state) => state.pageCounter.pageNumber);
  const dispatch = useDispatch();

  const nextPage = () => {
    dispatch({ type: "NEXT_PAGE" });
  };

  const prevPage = () => {
    dispatch({ type: "PREV_PAGE" });
  };

  return (
    <div className="pagenation">
      <button onClick={() => prevPage()}>＜</button>
      <span>　{pageNumber + 1}　</span>
      <button onClick={() => nextPage()}>＞</button>
    </div>
  );
};

export { Pagenation };
