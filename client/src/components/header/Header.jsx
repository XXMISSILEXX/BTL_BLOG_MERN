import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm myElement1">⚡️👑 🚀 Tran Hieu & PM Duc 🚀 👑 ⚡️</span>
        <span className="headerTitleLg myElement2">Blog</span>
      </div>
      <img
        className="headerImg"
        src="http://localhost:5000/images/mt.jpg"
        alt=""
      />
    </div>
  );
}
