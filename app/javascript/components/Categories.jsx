import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AuthContext from "./store/auth-context";
import Nav from "./Nav";

const Categories = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [reload, setReload] = useState(0);
  const params = useParams();

  useEffect(() => {
    const url = "/api/v1/categories/index";
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
        setCategories(res);
      })
      .catch(() => navigate("/"));
  }, [reload]);

  const deleteCategory = (id) => () => {
    const url = `/api/v1/categories/destroy/${id}`;
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
      .then(() => {
        alert("Category deleted");
        setReload((prev) => prev + 1);
      })
      .catch((error) => console.log(error.message));
  };

  // const allForums = forums.map((forum) => (
  //   <div key={forum.id} className="">
  //     <h1>{forum.title}</h1>
  //     <p>{forum.descriptions}</p>
  //     <Link to={`/forums/show/${forum.id}`}>View Forum</Link>
  //   </div>
  // ));

  // const ori = (
  //   <div>
  //     <h1>Forums page</h1>
  //     <Link to="/forum/create">Create New Forum</Link>
  //     {allForums}
  //   </div>
  // );

  const allCategories = categories.map((category) => (
    <Card key={category.id} className="mb-4">
      <Card.Header>Category</Card.Header>
      <div className="d-flex flex-row bd-highlight mb-3 align-items-center">
        <Card.Body className="p-2 bd-highlight">
          <Card.Title>{category.category}</Card.Title>
        </Card.Body>
        <Button
          variant="outline-primary margin-right"
          onClick={deleteCategory(category.id)}
        >
          Delete
        </Button>
        <Button
          variant="outline-primary margin-right"
          href={`/category/update/${category.id}`}
        >
          Edit
        </Button>
      </div>
    </Card>
  ));

  return (
    <>
      <Nav></Nav>
      <Container className="mt-4 ">
        <Row>
          <Col sm={3}></Col>
          <Col sm={6}>
            <Button
              variant="outline-primary margin-right"
              href="category/create"
            >
              New Category
            </Button>
            {allCategories}
          </Col>
          <Col sm={3}></Col>
        </Row>
      </Container>
    </>
  );
};

export default Categories;
