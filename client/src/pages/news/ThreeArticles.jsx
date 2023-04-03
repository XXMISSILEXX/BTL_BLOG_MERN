import { useEffect, useState } from "react";
import "./News.css";
import NewsItem from "../../components/news-item/NewsItem";
import axios from "axios";

export default function ThreeArticles(){
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const getFeaturedArticles = async () => {
          try {
            const res = await axios.get('/news');
            const featuredArticles = res.data.featuredArticles;
            setArticles(featuredArticles);
          } catch (error) {
            console.log(error);
          }
        };
    
        getFeaturedArticles();
    }, []);

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
    )
}