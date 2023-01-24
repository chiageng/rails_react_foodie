import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Form from "react-bootstrap/Form";
import Nav from "./Nav";

const CategoryForm = (props) => {
  return (
    <>
      <Nav></Nav>

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
          <Typography component="h1" variant="h5">
            {props.feature}
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={props.onSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="forumCategory"
              label="category"
              name="category"
              type="text"
              value={props.category}
              onChange={(event) => props.onChange(event, props.setCategory)}
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {props.button}
            </Button>
            <Button
              href={props.direction}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CategoryForm;
