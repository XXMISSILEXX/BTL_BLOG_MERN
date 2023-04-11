import axios from "axios";
import React, { useEffect, useState } from "react";
import NewsItem from "../../components/news-item/NewsItem";
import "./News.css";
import Pagination from "../Pagination/Pagination";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(6);

  const lastNewIndex = currentPage * newsPerPage;
  const firstNewIndex = lastNewIndex - newsPerPage;
  const currentNews = articles.slice(firstNewIndex, lastNewIndex);

  const totalPages = Math.ceil(articles.length / newsPerPage); // update totalPages calculation

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
  }, []);

  return (
    <>
      <div className="news-container">
        {currentNews.map(({ title, description, url, urlToImage }, index) => (
          <NewsItem
            key={index}
            title={title}
            description={description}
            url={url}
            urlToImage={urlToImage}
          />
        ))}
      </div>
      <Pagination
        totalPosts={articles.length}
        postsPerPage={newsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default News;
