import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reenterpassword, setReenterPassword] = useState("");
  const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [ReenterError,setReenterError] =useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (usernameError || emailError || passwordError || ReenterError) {
      return;
    }
    if (!username || !email || !password || !reenterpassword) {
      setError(true);
      alert("Please fill in all the fields!");
      return;
    }
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  const validateUsername = () => {
    if (!username) {
      setUsernameError("Username is required");
    } else if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long");
    } else {
      setUsernameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };
  const validateReenterPassword = () =>{
      if(!reenterpassword){
        setReenterError("Re-enter Password is required");
      }
      else if(reenterpassword != password){
        setReenterError("Incorrect with previous password!");
      }  
      else{
        setReenterError("");
      }     
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
          onBlur={validateUsername}
        />
        {usernameError && (
          <span className="registerError">{usernameError}</span>
        )}
        <label>Email</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
          onBlur={validateEmail}
        />
        {emailError && <span className="registerError">{emailError}</span>}
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePassword}
        />
        {passwordError && (
          <span className="registerError">{passwordError}</span>
        )}
        <label>Re-enter Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Re-enter password..."
          onChange={(e) => setReenterPassword(e.target.value)}
          onBlur={validateReenterPassword}
        />
        {ReenterError && (
          <span className="registerError">{ReenterError}</span>
        )}
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
