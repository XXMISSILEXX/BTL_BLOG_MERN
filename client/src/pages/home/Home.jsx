import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import CurrentWeather from "../weather/CurrentWeather";
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

  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showFromDateInput, setShowFromDateInput] = useState(false);
  const [showToDateInput, setShowToDateInput] = useState(false);

  const [usernameInputValue, setUsernameInputValue] = useState("");
  const [titleInputValue, setTitleInputValue] = useState("");
  const [fromDateInputValue, setFromDateInputValue] = useState("");
  const [toDateInputValue, setToDateInputValue] = useState("");

  const [sort, setSortOrder] = useState("desc");
  const handleUsernameInputChange = (e) => {
    setUsernameInputValue(e.target.value);
  };

  const handleTitleInputChange = (e) => {
    setTitleInputValue(e.target.value);
  };

  const handleFromDateInputChange = (e) => {
    setFromDateInputValue(e.target.value);
  };

  const handleToDateInputChange = (e) => {
    setToDateInputValue(e.target.value);
  };
  const handleUsernameCheckboxChange = () => {
    setShowUsernameInput(!showUsernameInput);
  };

  const handleTitleCheckboxChange = () => {
    setShowTitleInput(!showTitleInput);
  };

  const handleFromDateCheckboxChange = () => {
    setShowFromDateInput(!showFromDateInput);
  };

  const handleToDateCheckboxChange = () => {
    setShowToDateInput(!showToDateInput);
  };

  // const fetchPosts = async () => {
  //   const params = new URLSearchParams(search);
  //   const user = showUsernameInput ? usernameInputValue : null;
  //   const title = showTitleInput ? titleInputValue : null;
  //   const from = showFromDateInput ? fromDateInputValue : null;
  //   const to = showToDateInput ? toDateInputValue : null;

  //   console.log("Search params:", {
  //     user,
  //     title,
  //     from,
  //     to,
  //   });
  //   const res = await axios.get("/posts", {
  //     params: {
  //       user,
  //       title,
  //       from,
  //       to,
  //     },
  //   });
  //   setPosts(res.data);
  // };
  const toggleSortOrder = () => {
    setSortOrder(sort === "desc" ? "asc" : "desc");
  };
  const fetchPosts = async () => {
    const params = new URLSearchParams(search);
    const user = showUsernameInput ? usernameInputValue : null;
    const title = showTitleInput ? titleInputValue : null;
    const from = showFromDateInput ? fromDateInputValue : null;
    const to = showToDateInput ? toDateInputValue : null;
  
    console.log("Search params:", {
      user,
      title,
      from,
      to,
      sort,
    });
  
    const res = await axios.get("/posts", {
      params: {
        user,
        title,
        from,
        to,
        sort, // Add sortOrder as a query parameter
      },
    });
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  return (
    <>
      <Header />

      <div className="home">
        <div className="Search_And_Posts">
          <div className="Search-section">
            <div className="Checkbox-all">
              <div className="checkbox-row">
                <label className="Search-label">Search for:</label>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    onChange={handleUsernameCheckboxChange}
                  />
                  <label>Username</label>
                </div>
                <div className="checkbox-container">
                  <input type="checkbox" onChange={handleTitleCheckboxChange} />
                  <label>Title</label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    onChange={handleFromDateCheckboxChange}
                  />
                  <label>From date</label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    onChange={handleToDateCheckboxChange}
                  />
                  <label>To date</label>
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    onChange={toggleSortOrder}
                  />
                  <label>Oldest/Newest</label>
                </div>
                <div className="checkbox-container">
                  <button onClick={fetchPosts} className="Search-btn">
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="input-row">
              {showUsernameInput && (
                <div className="input-container">
                  <label>Username:</label>
                  <input
                    type="text"
                    value={usernameInputValue}
                    onChange={handleUsernameInputChange}
                  />
                </div>
              )}
              {showTitleInput && (
                <div className="input-container">
                  <label>Title:</label>
                  <input
                    type="text"
                    value={titleInputValue}
                    onChange={handleTitleInputChange}
                  />
                </div>
              )}
              {showFromDateInput && (
                <div className="input-container">
                  <label>From Date:</label>
                  <input
                    type="date"
                    value={fromDateInputValue}
                    onChange={handleFromDateInputChange}
                  />
                </div>
              )}
              {showToDateInput && (
                <div className="input-container">
                  <label>To Date:</label>
                  <input
                    type="date"
                    value={toDateInputValue}
                    onChange={handleToDateInputChange}
                  />
                </div>
              )}
            </div>
          </div>
          <Posts posts={currentPosts} />
        </div>
        <Sidebar className="Sidebar">
          <CurrentWeather />
        </Sidebar>
      </div>
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <ThreeArticles />
    </>
  );
}

