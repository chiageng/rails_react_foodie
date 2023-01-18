import React, { useState, useEffect, useCallback } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: !!localStorage.getItem("token"),
  login: (token) => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const initialToken =localStorage.getItem("token");

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;
  console.log("is user logged in?")
  console.log(userIsLoggedIn);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    alert("logout");
    window.location.reload(true);
  }

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    window.location.reload(true);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
