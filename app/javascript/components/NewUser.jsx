import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// const NewUser = ( { setStoredToken } ) => {
//   const navigate = useNavigate();
//   const authCtx = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const onChange = (event, setFunction) => {
//     setFunction(event.target.value);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     const url = "/api/v1/users/create";

//     if (username.length == 0 || password.length == 0) return;

//     const body = {
//       username,
//       password,
//     };

//     const token = document.querySelector('meta[name="csrf-token"]').content;
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": token,
//         "Content-Type": "application/json",
//         Authorization: localStorage.token
//       },
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((data) => {
//         authCtx.login(data.jwt);
//         // localStorage.setItem("token", data.jwt);
//         // localStorage.setItem("testing", "testing");
//         // authCtx.login(data.jwt);
//         // console.log(authCtx.isLoggedIn);
//         // setStoredToken(data.jwt);
//       })
//       .catch((error) => console.log(error.message));
//       setUsername("");
//       setPassword("");
//   };

//   return (
//     <div>
//       <h2>Here is signup page</h2>
//       <form onSubmit={onSubmit}>
//         <div>
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={username}
//             onChange={(event) => onChange(event, setUsername)}
//           ></input>
//         </div>
//         <div>
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={(event) => onChange(event, setPassword)}
//           ></input>
//         </div>
//         <div>
//           <button type="submit">Create User</button>
//           <Link to="/forums">Cancel</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewUser;


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/users/create";

    if (username.length == 0 || password.length == 0) return;

    const body = {
      username,
      password,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        authCtx.login(data.jwt);
        // localStorage.setItem("token", data.jwt);
        // localStorage.setItem("testing", "testing");
        // authCtx.login(data.jwt);
        // console.log(authCtx.isLoggedIn);
        // setStoredToken(data.jwt);
      })
      .catch((error) => console.log(error.message));
      setUsername("");
      setPassword("");
  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={onSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              type="username"
              value={username}
              onChange={(event) => onChange(event, setUsername)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              value={password}
              onChange={(event) => onChange(event, setPassword)}
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
