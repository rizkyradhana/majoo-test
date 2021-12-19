import React, { useState } from "react";

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    onAdd({ title, description });

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <form className="content" onSubmit={onSubmit}>
        <div className="input-section">
          <h4>Title</h4>
          <input
            type="text"
            placeholder="Add Title"
            className="add-todo-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-section">
          <h4>Description</h4>
          <input
            type="text"
            placeholder="Add Description"
            className="add-todo-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <input type="submit" value="Add Todo" className="button" />
      </form>
    </div>
  );
};

export default AddTodo;
