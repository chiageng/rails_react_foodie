import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Forums from "../components/Forums";
import Forum from "../components/Forum";
import NewForum from "../components/NewForum";
import EditForum from "../components/EditForum";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forums" element={<Forums/>} />
      <Route path="/forums/show/:id" element={<Forum/>}/>
      <Route path="/forum/create" element={<NewForum/>} />
      <Route path="/forum/update/:id" element={<EditForum/>} />
    </Routes>
  </Router>
);