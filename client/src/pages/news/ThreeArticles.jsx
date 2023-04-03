import { useEffect, useState } from "react";
import "./News.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewsItem2 from "../../components/news-item/NewsItem2";

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        horizontal: true, // add this property to make the slider horizontal
        autoplay: true, // add this property to enable auto play
        autoplaySpeed: 2500 // add this property to set the auto play interval in milliseconds
    };

    return (
      <Slider {...settings}>  
            {articles.map(({ title, description, url, urlToImage }, index) => (
                <NewsItem2
                    key={index}
                    title={title}
                    description={description}
                    url={url}
                    urlToImage={urlToImage}
                />
            ))}
        
      </Slider>
    )
}