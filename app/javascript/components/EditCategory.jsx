import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";

const EditCategory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  useEffect(() => {
    const url = `/api/v1/category/update/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setCategory(response.category);
      })
      .catch(() => alert("error"));
  }, [params.id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/categories/update/${params.id}`;

    if (category.category == 0) return;

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
          <label htmlFor="forumTitle">Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(event) => onChange(event, setCategory)}
          ></input>
        </div>
        <div>
          <button type="submit">Update Category</button>
          <Link to="/categories">Cancel</Link>
        </div>
      </form>
    </div>
  );

  return (
    <CategoryForm
      onSubmit={onSubmit}
      category={category}
      setCategory={setCategory}
      onChange={onChange}
      direction="/categories"
      button="Update Category"
    ></CategoryForm>
  );
};

export default EditCategory;
