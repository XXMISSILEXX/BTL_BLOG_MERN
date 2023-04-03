import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import CurrentWeather from "../../pages/weather/CurrentWeather"
import Trivia from "../trivia/trivia";
export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">NHÓM 1-VJP_PRO- Tran Hieu & PM Duc</span>
        <img
          src="http://localhost:5000/images/Blog_Header.jpg"
          alt=""
        />
        <p>
          Alone,we can do so little; together,we can do so much - Hellen Keller
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
            <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
        </div>
        <div className="sidebarItem">
            <CurrentWeather/>
        </div>
        <div>
          <Trivia/>
        </div>
      </div>
      {/* <div className="sidebar-item">
        <h3>Current Temperature:</h3>
        <p>{currentTemperature} °C</p>
      </div>
      <div className="sidebar-item">
        <h3>Current Condition:</h3>
        <p>{currentCondition}</p>
      </div> */}
    </div>
    
  );
}
