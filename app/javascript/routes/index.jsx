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
import Categories from "../components/Categories";
import NewCategory from "../components/NewCategory";
import EditCategory from "../components/EditCategory";

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
          <Route path="/forums/show/:id" element={authCtx.isLoggedIn ? <Forum /> : <Navigate to="/login"></Navigate>} />
          <Route path="/forum/create" element={authCtx.isLoggedIn ? <NewForum /> : <Navigate to="/login"></Navigate>} />
          <Route path="/forum/update/:id" element={authCtx.isLoggedIn ? <EditForum /> : <Navigate to="/login"></Navigate>} />
          <Route path="/signup" element={authCtx.isLoggedIn ? <NewUser /> : <Navigate to="/login"></Navigate>} />
          <Route path="/login" element={authCtx.isLoggedIn ? <Navigate to="/"></Navigate> : <Login />} />

          <Route path="/users" element={authCtx.isLoggedIn ? <Users /> : <Navigate to="/login"></Navigate>} />
          <Route path="/users/show/:id" element={authCtx.isLoggedIn ? <User /> : <Navigate to="/login"></Navigate>} />

          <Route path="/categories" element={authCtx.isLoggedIn ? <Categories></Categories> : <Navigate to="/login"></Navigate>}/>
          <Route path="/category/create" element={authCtx.isLoggedIn ? <NewCategory></NewCategory> : <Navigate to="/login"></Navigate>}/>
          <Route path="/category/update/:id" element={authCtx.isLoggedIn ? <EditCategory></EditCategory> : <Navigate to="/login"></Navigate>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};
export default Index;
