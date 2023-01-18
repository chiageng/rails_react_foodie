import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Forums from "../components/Forums";
import Forum from "../components/Forum";
import NewForum from "../components/NewForum";
import EditForum from "../components/EditForum";
import NewUser from "../components/NewUser";
import Users from "../components/Users";
import User from "../components/User";
import Login from "../components/Login";

const Index = (props) => {
  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log(storedToken);
  }, [storedToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setStoredToken={setStoredToken}/>} />
        <Route path="/forums" element={<Forums setStoredToken={setStoredToken}/>} />
        <Route path="/forums/show/:id" element={<Forum setStoredToken={setStoredToken}/>} />
        <Route path="/forum/create" element={<NewForum setStoredToken={setStoredToken}/>} />
        <Route path="/forum/update/:id" element={<EditForum setStoredToken={setStoredToken}/>} />
        <Route path="/signup" element={<NewUser setStoredToken={setStoredToken}/>} />
        <Route path="/login" element={<Login setStoredToken={setStoredToken}/>} />

        <Route path="/users" element={<Users setStoredToken={setStoredToken}/>} />
        <Route path="/users/show/:id" element={<User setStoredToken={setStoredToken}/>} />
      </Routes>
    </Router>
  );
};
export default Index;
