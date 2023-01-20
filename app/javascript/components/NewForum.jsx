import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

const NewForum = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [category, setCategory] = useState("");


  useEffect(() => {
    const url = "/api/v1/forum/create";
    fetch(url, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setCategoriesArr(res);
        setCategory(res[0]);
      })
      .catch(() => navigate("/"));
  }, []);

  const onChange = (event, setFunction) => {
    console.log(event);
    setFunction(event.target.value);
  };


  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/forums/create";

    if (title.length == 0 || descriptions.length == 0) return;

    const body = {
      title,
      descriptions,
      category
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/forums/show/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="forumTitle">Forum Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => onChange(event, setTitle)}
          ></input>
        </div>
        <div>
          <label htmlFor="forumDescriptions">Forum Descriptions</label>
          <input
            type="text"
            name="descriptions"
            value={descriptions}
            onChange={(event) => onChange(event, setDescriptions)}
          ></input>
        </div>
        <select onChange={(event) => onChange(event, setCategory)} value={category}>
          <option>Open this select menu</option>
          {categoriesArr.map(category => (
            <option name="category" value={category} key={category}>{category}</option>
          ))}
        </select>
        <div>
          <button type="submit">Create Forum</button>
          <Link to="/forums">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default NewForum;
