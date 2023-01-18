import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "../components/Home";
import Forums from "../components/Forums";
import Forum from "../components/Forum";
import NewForum from "../components/NewForum";
import EditForum from "../components/EditForum";
import NewUser from "../components/NewUser";
import Users from "../components/Users";
import User from "../components/User";
import Login from "../components/Login";
import AuthContext, { AuthContextProvider } from "../components/store/auth-context";

const Index = (props) => {
  const authCtx = useContext(AuthContext);
  console.log("In routes");
  console.log(authCtx.isLoggedIn);

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forums" element={authCtx.isLoggedIn ? <Forums></Forums> : <Navigate to="/login"></Navigate>}/>
          <Route path="/forums/show/:id" element={<Forum />} />
          <Route path="/forum/create" element={<NewForum />} />
          <Route path="/forum/update/:id" element={<EditForum />} />
          <Route path="/signup" element={<NewUser />} />
          <Route path="/login" element={authCtx.isLoggedIn ? <Navigate to="/"></Navigate> : <Login />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/show/:id" element={<User />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};
export default Index;
