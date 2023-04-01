import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { FaMicrophone } from 'react-icons/fa';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [speechContent, setSpeechContent] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc: speechContent || desc, // Use the transcribed speech if available
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    // Set the language for the speech recognition
    recognition.lang = 'en-US';
    // Start listening to the user's speech
    recognition.start();
    // Handle the results of the speech recognition
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      // Update the transcribed speech separately from the description state
      setSpeechContent(transcript);
    };
  };

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            value={speechContent || desc} // Use the transcribed speech if available
            onChange={(e) => setSpeechContent(e.target.value)} // Update the transcribed speech separately
          ></textarea>
          <button className="speak-button" onClick={startSpeechRecognition}>
            Speak
            <span className="speak-icon"><FaMicrophone /></span>
          </button>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
