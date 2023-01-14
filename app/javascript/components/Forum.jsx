import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Forum = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({});

  useEffect(() => {
    const url = `/api/v1/forums/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setForum(response))
      .catch(() => navigate("/forums"));
  }, [params.id]);

  const deleteForum = () => {
    const url = `/api/v1/forums/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/forums"))
      .catch((error) => console.log(error.message));
  };

  const displayForum = <div>
    <h1>{forum.title}</h1>
    <p>{forum.descriptions}</p>
  </div>

  return <div>{displayForum}
  <Link to="/forums"> Back to Forums Page </Link>
  <Link to={`/forum/update/${forum.id}`}> Edit Forum </Link>
  <button type="button" onClick={deleteForum}>Delete Forum</button>
  </div>;
};

export default Forum;
