import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "/api/v1/users/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setUsers(res))
      .catch(() => navigate("/"));
  }, []);

  // const allForums = forums.map((forum) => (
  //   <div key={forum.id} className="">
  //     <h1>{forum.title}</h1>
  //     <p>{forum.descriptions}</p>
  //     <Link to={`/forums/show/${forum.id}`}>View Forum</Link>
  //   </div>
  // ));

  // const ori = (
  //   <div>
  //     <h1>Forums page</h1>
  //     <Link to="/forum/create">Create New Forum</Link>
  //     {allForums}
  //   </div>
  // );

  const allUsers = users.map((user) => (
    <div key={user.id}>
      <h1>{user.username}</h1>
      <Button variant="outline-primary margin-right" href={`/users/show/${user.id}`}>Show</Button>
    </div>
  ));

  return (
    <div className="mt-4 ">
      {allUsers}
    </div>
  );
};

export default Users;
