import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const User = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({});


  useEffect(() => {
    const url = `/api/v1/users/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setUser(response);
      })
      .catch(() => navigate("/users"));
  }, [params.id]);

  const deleteUser = () => {
    const url = `/api/v1/users/destroy/${params.id}`;
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
      .then(() => navigate("/users"))
      .catch((error) => console.log(error.message));
  };
  const onChange = (event) => {
    setComment(event.target.value);
  };


  const displayUser = (
    <div>
      <h1>{user.username}</h1>
    </div>
  );

  return (
    <div>
      {displayUser}
      <Link to="/users"> Back to Users Page </Link>
      <Link to={`/user/update/${user.id}`}> Edit User</Link>
      <button type="button" onClick={deleteUser}>
        Delete User
      </button>
    </div>
  );
};

export default User;