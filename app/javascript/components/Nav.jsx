import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Nav = (props) => {
  const authCtx = useContext(AuthContext);

  let allCategories;

  if (props.categories) {
    allCategories = props.categories.map((category) => (
        <Button
          variant="outline-primary margin-right"
          key={category.id}
          onClick={(event) => props.onClickCategory(event, category.category)}
        >
          {category.category}
        </Button>
    ));
  }
  
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} href="/forums">
          <Button href='/forums'>Foodie</Button>
          <Button href='/forums'>Home</Button>
          <Button href='/categories'>Categories</Button>
        </Typography>
        <Typography>{allCategories}</Typography>

        <Button
          onClick={authCtx.logout}
          variant="outlined"
          sx={{ my: 1, mx: 1.5 }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
