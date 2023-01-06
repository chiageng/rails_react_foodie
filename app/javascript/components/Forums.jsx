import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Forums = () => {
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const url = "/api/v1/forums/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setForums(res))
      .catch(() => navigate("/"));
  }, []);

  const allForums = forums.map((forum) => 
    <div key={forum.id} className="">
        <h1>{forum.title}</h1>
        <p>{forum.descriptions}</p>
        <Link to={`/forums/show/${forum.id}`}>View Forum</Link>
    </div>
  )

  return (
    <div>
      <h1>Forums page</h1>
      <Link to="/forum/create">Create New Forum</Link>
      {allForums}
    </div>
  );
};

export default Forums;
