import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ForumForm from "./ForumForm";

const EditForum = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [category, setCategory] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = `/api/v1/forum/update/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setTitle(response.forum.title);
        setDescriptions(response.forum.descriptions);
        setCategoriesArr(response.categories)
        setCategory(response.category)
      })
      .catch(() => navigate("/forums"));
  }, [params.id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/forums/update/${params.id}`;

    if (title.length == 0 || descriptions.length == 0) return;

    const body = {
      title,
      descriptions,
      category
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
      .then((response) => navigate(`/forums/show/${params.id}`))
      .catch((error) => console.log(error.message));
  };

  const oldForm = (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="forumTitle">Forum Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => onChange(event, setTitle)}
          ></input>
        </div>
        <div>
          <label htmlFor="forumDescriptions">Forum Descriptions</label>
          <input
            type="text"
            name="descriptions"
            value={descriptions}
            onChange={(event) => onChange(event, setDescriptions)}
          ></input>
        </div>
        <div>
          <button type="submit">Update Forum</button>
          <Link to={`/forums/show/${params.id}`}>Cancel</Link>
        </div>
      </form>
    </div>
  );

  return (
    <ForumForm
      feature="Edit Forum"
      button="Update Forum"
      onSubmit={onSubmit}
      title={title}
      descriptions={descriptions}
      direction={`/forums/show/${params.id}`}
      onChange={onChange}
      setTitle={setTitle}
      setDescriptions={setDescriptions}
      setCategory={setCategory}
      categoriesArr={categoriesArr}
      category={category}
      disabled={true}
    ></ForumForm>
  );
};

export default EditForum;
