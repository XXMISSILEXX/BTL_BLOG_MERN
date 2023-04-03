import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsItem from "../../components/news-item/NewsItem";
import "./News.css";


const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get('/news');
        setArticles(res.data.articles);
      } catch (error) {
        console.log(error);
      }
    };

    getArticles();
  }, []); // add an empty dependency array to prevent infinite loop

  return (
    <div className="news-container">
      {articles.map(({ title, description, url, urlToImage }, index) => (
        <NewsItem
          key={index}
          title={title}
          description={description}
          url={url}
          urlToImage={urlToImage}
        />
      ))}
    </div>
  );
};

export default News;
