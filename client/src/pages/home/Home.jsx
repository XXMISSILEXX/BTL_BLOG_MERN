import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import CurrentWeather from "../weather/CurrentWeather"
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";
import Pagination from "../Pagination/Pagination";
import ThreeArticles from "../news/ThreeArticles";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={currentPosts} />
        <Sidebar >
          <CurrentWeather/>
        </Sidebar>
      </div>
      <Pagination
          totalPosts={posts.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
      />
      <ThreeArticles/>  
    </>
  );
}
