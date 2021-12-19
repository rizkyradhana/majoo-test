import React from "react";

const Complete = ({ completeTodo, deleteTodos }) => {
  return (
    <div>
      <h4>Completed Todos</h4>
      <div className="todos">
        {completeTodo.map((todo) => (
          <div className={"todo " + (todo.status === 1 ? "is-complete" : "")}>
            <div className="text">{todo.title + " - " + todo.description}</div>
            <div className="delete-todo" onClick={() => deleteTodos(todo.id)}>
              x
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complete;
