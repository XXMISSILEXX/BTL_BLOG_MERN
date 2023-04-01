import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import { FaMicrophone } from "react-icons/fa";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(5);
  
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    // Set the language for the speech recognition
    recognition.lang = 'en-US';
    // Start listening to the user's speech
    recognition.start();
    // Handle the results of the speech recognition
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      // Update the comment input with the transcribed speech
      setCommentContent(transcript);
    };
    // Stop the speech recognition after 5 seconds
    setTimeout(() => {
      recognition.stop();
    }, 5000);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(` /posts/${post._id} `, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };

//function to genereate time for the created comment
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }



  async function deleteComment(commentId) {
    const confirmed = window.confirm("Are you sure you want to delete this comment?");
    if (confirmed) {
      try {
        await axios.delete(`/comments/${commentId}`);
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.filter((comment) => comment._id !== commentId),
        }));
        window.alert("Comment deleted successfully!");
      } catch (err) {
        console.error(err);
      }
    }
  }
  

function editComment(commentId) {
  // Code to edit the comment with the given ID
  
}
const handleCommentSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post(`/posts/${post._id}/comments`, {
      username: user.username,
      content: commentContent
    });
    console.log("comment post response:", res.data);
    setCommentContent("");
    setComments([...comments, res.data]);
    window.location.reload();
  } catch (err) {}
};

const handleShowMoreComments = () => {
  setShowComments(showComments + 5);
};

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
             <button className="share-twitter">
    <a href={`https://twitter.com/intent/tweet?text=${post.title}&url=${window.location.href}`} target="_blank">
      <span>Share on Twitter</span>
    </a>
  </button>
      </div>
      <div class="singlePostWrapper">
        <h3>Comment</h3>
            <form onSubmit={handleCommentSubmit}>
        <div className="">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          ></textarea>
        </div>
        <div className="comment-controls">
        <button className="speak-button" onClick={startSpeechRecognition}>
            <FaMicrophone />
          </button>
          <button type="submit">Submit</button>
          
        </div>
      </form>
        <div>
          <div>
            <div>
            {post.comments && post.comments.slice(0, showComments).map((comment) => (
     <div className={`comment ${comment.username === user?.username ? "current-user-comment" : ""}`} key={comment._id}>
        <p>{comment.content}</p>
        <span className="comment-timestamp">By {comment.username} on {new Date(comment.createdAt).toLocaleDateString()} at {formatTime(comment.createdAt)}</span>

        {user && user.username === comment.username && (
          <div className="comment-buttons">
            <button className="delete-button" onClick={() => deleteComment(comment._id)}>Delete</button>
            <button className="edit-button" onClick={() => editComment(comment._id)}>Edit</button>
          </div>
        )}
      </div>
    ))}

              {post.comments && post.comments.length > showComments && (
        <button className="show-more-comments" onClick={handleShowMoreComments}>Show more comments</button>
      )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}