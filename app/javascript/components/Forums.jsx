import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthContext from "./store/auth-context";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import Nav from "./Nav";
// import '@fontsource/roboto/700.css';

// const Forums = () => {
//   const authCtx = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [forums, setForums] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selected, setSelected] = useState("");
//   const [filtered, setFiltered] = useState([]);

//   useEffect(() => {
//     const url = "/api/v1/forums/index";
//     fetch(url, {
//       method: "GET",
//       headers: {
//         Accepts: "application/json",
//         "Content-type": "application/json",
//         Authorization: localStorage.token,
//       },
//     })
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((res) => {
//         setForums(res.forums);
//         setCategories(res.categories);
//       })
//       .catch(() => navigate("/"));
//   }, []);

//   const onPostCategory = (category) => {
//     const url = "/api/v1/forums/index/filtered";

//     if (category.length == 0) {
//       return;
//     }

//     const body = {
//       category: category,
//     };

//     const token = document.querySelector('meta[name="csrf-token"]').content;
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": token,
//         "Content-Type": "application/json",
//         Authorization: localStorage.token,
//       },
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((response) => {
//         setFiltered(response);
//       })
//       .catch((error) => console.log(error.message));
//   };

//   let allForums = forums.map((forum) => (
//     <Card key={forum.id} className="mb-4">
//       <Card.Header>Forum</Card.Header>
//       <div className="d-flex flex-row bd-highlight mb-3 align-items-center">
//         <img
//           src={forum.image}
//           className="p-2 bd-highlight"
//           alt="..."
//           width="100px"
//           height="100px"
//         ></img>
//         <Card.Body className="p-2 bd-highlight">
//           <Card.Title>{forum.title}</Card.Title>
//           <Card.Text>{forum.descriptions}</Card.Text>
//         </Card.Body>
// <Button
//   variant="outline-primary margin-right"
//   href={`/forums/show/${forum.id}`}
// >
//   Show
// </Button>
//       </div>
//     </Card>
//   ));

//   if (selected != "") {
//     allForums = filtered.map((forum) => (
//       <Card key={forum.id} className="mb-4">
//         <Card.Header>Forum</Card.Header>
//         <div className="d-flex flex-row bd-highlight mb-3 align-items-center">
//           <img
//             src={forum.image}
//             className="p-2 bd-highlight"
//             alt="..."
//             width="100px"
//             height="100px"
//           ></img>
//           <Card.Body className="p-2 bd-highlight">
//             <Card.Title>{forum.title}</Card.Title>
//             <Card.Text>{forum.descriptions}</Card.Text>
//           </Card.Body>
//           <Button
//             variant="outline-primary margin-right"
//             href={`/forums/show/${forum.id}`}
//           >
//             Show
//           </Button>
//         </div>
//       </Card>
//     ));
//   }

//   const logoutHandler = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("testing");
//     setStoredToken(null);
//     alert("logout");
//   };

//   const onClickCategory = (event, category) => {
//     setSelected(category);
//     onPostCategory(category);
//   };

//   const allCategories = categories.map((category) => (
//     <Button
//       variant="outline-primary margin-right"
//       key={category.id}
//       onClick={(event) => onClickCategory(event, category.category)}
//     >
//       {category.category}
//     </Button>
//   ));

//   return (
//     <Container className="mt-4 ">
//       <Row>
//         <Col sm={3}></Col>
//         <Col sm={6}>
//           <div>
//           <Button variant="outline-primary margin-right" href="forum/create">New Forum</Button>
//           <Button variant="outline-primary margin-right" onClick={authCtx.logout}>Logout</Button>
//           </div>
//           <div>
//           <Button variant="outline-primary margin-right" onClick={event => onClickCategory(event, "")}>All</Button>
//           {allCategories}
//           </div>
//           {allForums}
//         </Col>
//         <Col sm={3}></Col>
//       </Row>

//     </Container>
//   );
// };

// export default Forums;

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

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const Forums = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const url = "/api/v1/forums/index";
    fetch(url, {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setForums(res.forums);
        setCategories(res.categories);
      })
      .catch(() => navigate("/"));
  }, []);

  const onPostCategory = (category) => {
    const url = "/api/v1/forums/index/filtered";

    if (category.length == 0) {
      return;
    }

    const body = {
      category: category,
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
      .then((response) => {
        setFiltered(response);
      })
      .catch((error) => console.log(error.message));
  };

  const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#651fff",
      },
    },
  });

  // let allForums = forums.map((forum) => (
  //   // Enterprise card is full width at sm breakpoint
  //   <Grid item key={forum.id} xs={12} md={4}>
  //     <Card>
  //       <CardHeader
  //         title="Foodie"
  //         // subheader={forum.descriptions}
  //         titleTypographyProps={{ align: "center" }}
  //         action={<StarIcon />}
  //         subheaderTypographyProps={{
  //           align: "center",
  //         }}
  //         sx={{
  //           backgroundColor: (theme) => theme.palette.grey[300],
  //           color: "primary.main",
  //           fontWeight: 800,
  //         }}
  //       />
  //       <CardContent>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "baseline",
  //             mb: 2,
  //             height: "100%",
  //           }}
  //         >
  //           <Typography component="h3" variant="h4" color="text.primary">
  //             {forum.title}
  //           </Typography>
  //         </Box>
  //         <ul>
  //           <Typography
  //             component="li"
  //             variant="subtitle1"
  //             align="center"
  //             key={forum.id}
  //           >
  //             {forum.descriptions}
  //           </Typography>
  //         </ul>
  //       </CardContent>
  //       <CardActions>
  //         <Button
  //           fullWidth
  //           variant="outline-primary margin-right"
  //           href={`/forums/show/${forum.id}`}
  //         >
  //           Show
  //         </Button>
  //       </CardActions>
  //     </Card>
  //   </Grid>
  // ));
  let allForums = (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {forums.map((forum) => (
          <Grid item key={forum.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: "5%",
                  width: "50%",
                  display: "flex",
                  alignSelf: "center",
                }}
                image={forum.image}
                alt="random"
              />
              <CardContent
                sx={{ flexGrow: 1, alignSelf: "center", weight: "bold" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", textTransform: "capitalize", textAlign: 'center' }}
                >
                  {forum.title}
                </Typography>
                <Typography sx={{ textTransform: "capitalize", textAlign: 'center' }}>
                  {forum.descriptions}
                </Typography>
              </CardContent>
              <CardActions sx={{ alignSelf: "center" }}>
                <Button
                  fullWidth
                  variant="outline-primary margin-right"
                  href={`/forums/show/${forum.id}`}
                >
                  Show
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  if (selected != "") {
    allForums = 
      <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {filtered.map((forum) => (
          <Grid item key={forum.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                sx={{
                  // 16:9
                  pt: "5%",
                  width: "50%",
                  display: "flex",
                  alignSelf: "center",
                }}
                image={forum.image}
                alt="random"
              />
              <CardContent
                sx={{ flexGrow: 1, alignSelf: "center", weight: "bold" }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: "bold", textTransform: "capitalize", textAlign: 'center' }}
                >
                  {forum.title}
                </Typography>
                <Typography sx={{ textTransform: "capitalize", textAlign: 'center' }}>
                  {forum.descriptions}
                </Typography>
              </CardContent>
              <CardActions sx={{ alignSelf: "center" }}>
                <Button
                  fullWidth
                  variant="outline-primary margin-right"
                  href={`/forums/show/${forum.id}`}
                >
                  Show
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  }

  const onClickCategory = (event, category) => {
    setSelected(category);
    onPostCategory(category);
    // console.log(category);
  };

  // const allCategories = categories.map((category) => (
  //   <Button
  //     variant="outline-primary margin-right"
  //     key={category.id}
  //     onClick={(event) => onClickCategory(event, category.category)}
  //   >
  //     {category.category}
  //   </Button>
  // ));

  return (
    <React.Fragment>
      <Nav categories={categories} onClickCategory={onClickCategory}></Nav>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="black"
          gutterBottom
          fontWeight="bold"
        >
          Foodie Forums
        </Typography>
        <Button
              fullWidth
              variant="outline-primary margin-right"
              href={"/forum/create"}
            >
              Create New Forum
            </Button>
      </Container>

      {/* End hero unit */}
      {allForums}
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
};

export default Forums;
