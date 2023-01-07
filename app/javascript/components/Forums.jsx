import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Forums = () => {
  const navigate = useNavigate();
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const url = "/api/v1/forums/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setForums(res))
      .catch(() => navigate("/"));
  }, []);

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

  const allForums = forums.map((forum) => (
    <Card key={forum.id} className="mb-4">
      <Card.Header>Forum</Card.Header>
      <div className="d-flex flex-row bd-highlight mb-3 align-items-center">
      <img src={forum.image} className="p-2 bd-highlight" alt="..." width="100px" height="100px"></img>
      <Card.Body className="p-2 bd-highlight">
        <Card.Title>{forum.title}</Card.Title>
        <Card.Text>
          {forum.descriptions}
        </Card.Text>
      </Card.Body>
      <Button variant="outline-primary margin-right" href={`/forums/show/${forum.id}`}>Show</Button>
      </div>
    </Card>
  ));

  return (
    <Container className="mt-4 ">
      <Row>
        <Col sm={3}></Col>
        <Col sm={6}>
          {allForums}
        </Col>
        <Col sm={3}></Col>
      </Row>
    </Container>
  );
};

export default Forums;
