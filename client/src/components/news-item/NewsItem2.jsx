import React from "react";
import "./NewsItem.css"

const NewsItem2 = ({ title, description, url, urlToImage }) => {
  return (
    <div className="news-item-two">
      <img src={urlToImage} alt="Image" />
      <h3>
        <a href={url}>{title}</a>
      </h3>
      <p>{description}</p>
    </div>
  );
};

export default NewsItem2;
