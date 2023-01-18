import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "./store/auth-context";

const NewUser = ( { setStoredToken } ) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/users/create";

    if (username.length == 0 || password.length == 0) return;

    const body = {
      username,
      password,
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
        authCtx.login(data.jwt);
        // localStorage.setItem("token", data.jwt);
        // localStorage.setItem("testing", "testing");
        // authCtx.login(data.jwt);
        // console.log(authCtx.isLoggedIn);
        // setStoredToken(data.jwt);
      })
      .catch((error) => console.log(error.message));
      setUsername("");
      setPassword("");
  };

  return (
    <div>
      <h2>Here is signup page</h2>
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
          <button type="submit">Create User</button>
          <Link to="/forums">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default NewUser;
