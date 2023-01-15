import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Forum = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState(0);

  useEffect(() => {
    const url = `/api/v1/forums/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setForum(response.forum);
        setComments(response.comments);
      })
      .catch(() => navigate("/forums"));
  }, [params.id, addComment]);

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
  const onChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/forums/${params.id}/comments/create`;

    if (comment.length == 0) return;

    
    const body = {
      comment
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setAddComment(prev => prev + 1);
        setComment("");
        })
      .catch((error) => console.log(error.message));
  };

  const displayForum = (
    <div>
      <h1>{forum.title}</h1>
      <p>{forum.descriptions}</p>
    </div>
  );
  const displayComments = comments.map((comment) => (
    <p key={comment.id}>Comment : {comment.comment}</p>
  ));

  return (
    <div>
      {displayForum}
      {displayComments}
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={onChange}
            ></input>
          </div>
          <div>
            <button type="submit">Create comment</button>
          </div>
        </form>
      </div>

      <Link to="/forums"> Back to Forums Page </Link>
      <Link to={`/forum/update/${forum.id}`}> Edit Forum </Link>
      <button type="button" onClick={deleteForum}>
        Delete Forum
      </button>
    </div>
  );
};

export default Forum;
