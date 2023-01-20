import React, { useContext, useState } from "react";
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

// const Login = ({ setStoredToken}) => {
//   const authCtx = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const onChange = (event, setFunction) => {
//     setFunction(event.target.value);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     const url = "/api/v1/login";

//     if (username.length == 0 || password.length == 0) return;

//     const body = {
//       user: {
//         username,
//         password,
//       },
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
//         // localStorage.setItem("token", data.jwt);
//         authCtx.login(data.jwt);
//         navigate("/");
//       })
//       .catch((error) => alert(error.message));
//       setUsername("");
//       setPassword("");
//   };

//   return (
//     <div>
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
//           <button type="submit">Login</button>
//           <button href="/forums">Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;

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
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
    console.log(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/login";
    console.log(password);
    console.log(username);

    if (username.length == 0 || password.length == 0) return;

    const body = {
      user: {
        username,
        password,
      },
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Authorization: localStorage.token,
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
        // localStorage.setItem("token", data.jwt);
        authCtx.login(data.jwt);
        navigate("/");
      })
      .catch((error) => alert(error.message));
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
            Sign in
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
              label="Password"
              type="password"
              value={password}
              onChange={(event) => onChange(event, setPassword)}
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
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
