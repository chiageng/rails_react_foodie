import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setStoredToken}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/login";

    if (username.length == 0 || password.length == 0) return;

    const body = {
      user: {
        username,
        password,
      },
    };


    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        localStorage.setItem("token", data.jwt);
        setStoredToken(data.jwt);
        navigate("/");
      })
      .catch((error) => alert(error.message));
      setUsername("");
      setPassword("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => onChange(event, setUsername)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => onChange(event, setPassword)}
          ></input>
        </div>
        <div>
          <button type="submit">Login</button>
          <Link to="/forums">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
