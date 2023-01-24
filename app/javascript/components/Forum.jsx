import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "./store/auth-context";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Form from "react-bootstrap/Form";
import Nav from "./Nav";

const Forum = () => {
  const params = useParams();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [forum, setForum] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState(0);

  useEffect(() => {
    const url = `/api/v1/forums/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setForum(response.forum);
        setComments(response.comments);
      })
      .catch(() => navigate("/forums"));
  }, [params.id, addComment]);

  const deleteForum = () => {
    const url = `/api/v1/forums/destroy/${params.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
        Authorization: localStorage.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() =>{ 
        alert("Deleted");
        navigate("/forums");
      })
      .catch((error) => console.log(error.message));
  };
  const onChange = (event) => {
    setComment(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/forums/${params.id}/comments/create`;

    if (comment.length == 0) return;

    const body = {
      comment,
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
        setAddComment((prev) => prev + 1);
        setComment("");
      })
      .catch((error) => console.log(error.message));
  };

  // const displayForum = (
  //   <div>
  //     <h1>{forum.title}</h1>
  //     <p>{forum.descriptions}</p>
  //   </div>
  // );
  // const displayComments = comments.map((comment) => (
  //   <p key={comment.id}>Comment : {comment.comment}</p>
  // ));

  const displayComments = comments.map((comment) => (
    <Typography key={comment.id} sx={{ textTransform: "capitalize" }}>
      {comment.comment}
    </Typography>
  ));

  const displayForum = (
    <Container sx={{ py: 5 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container>
        <Grid item key={forum.id} sm={5}>
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
                sx={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  textAlign: "center",
                }}
              >
                {forum.title}
              </Typography>
              <Typography
                sx={{ textTransform: "capitalize", textAlign: "center" }}
              >
                {forum.descriptions}
              </Typography>
            </CardContent>
            <CardActions sx={{ alignSelf: "center" }}></CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1, weight: "bold" }}>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Comments
              </Typography>
              {displayComments}
            </CardContent>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="text"
                  placeholder="Comment"
                  name="comment"
                  value={comment}
                  onChange={onChange}
                />
              </Form.Group>
            </Form>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  const oldDisplay = (
    <div>
      {displayForum}
      {/* {displayComments} */}
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="comment">Comment</label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={onChange}
            ></input>
          </div>
          <div>
            <button type="submit">Create comment</button>
          </div>
        </form>
      </div>

      <Link to="/forums"> Back to Forums Page </Link>
      <Link to={`/forum/update/${forum.id}`}> Edit Forum </Link>
      <button type="button" onClick={deleteForum}>
        Delete Forum
      </button>
    </div>
  );

  return (
    <React.Fragment>
      <Nav></Nav>
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
        <Grid container>
          <Grid item xs={3} sm={4}>
            <Button
              fullWidth
              variant="outline-primary margin-right"
              href={`/forums`}
            >
              Home
            </Button>
          </Grid>
          <Grid item xs={3} sm={4} md={3}>
            <Button
              fullWidth
              variant="outline-primary margin-right"
              href={`/forum/update/${forum.id}`}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={3} sm={4}>
            <Button
              fullWidth
              variant="outline-primary margin-right"
              onClick={deleteForum}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </Container>
      {displayForum}
    </React.Fragment>
  );
};

export default Forum;
