import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const NewCategory = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/categories/create";

    if (category.length == 0) return;

    const body = {
      category,
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
      .then((response) => navigate("/categories"))
      .catch((error) => console.log(error.message));
  };

  const oldForm = (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="forumTitle">Category Title</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(event) => onChange(event, setCategory)}
          ></input>
        </div>
        <div>
          <button type="submit">Create Category</button>
          <Link to="/categories">Cancel</Link>
        </div>
      </form>
    </div>
  );

  return (
    <CategoryForm
      onSubmit={onSubmit}
      category={category}
      onChange={onChange}
      setCategory={setCategory}
      button="Create Category"
      direction="/categories"
    ></CategoryForm>
  );
};

export default NewCategory;
