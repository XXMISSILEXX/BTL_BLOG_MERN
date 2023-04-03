import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Tran Hieu & PM Duc</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="http://localhost:5000/images/mt.jpg"
        alt=""
      />
    </div>
  );
}
