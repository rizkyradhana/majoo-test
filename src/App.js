import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Complete from "./components/Complete";
const api_base = "http://localhost:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [complete, setComplete] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todosFromAPI = await fetchTodos();
      setTodos(todosFromAPI);
      setComplete(todosFromAPI.filter((todo) => todo.status == 1));
    };
    getTodos();
  }, []);

  useEffect(() => {
    setComplete(todos.filter((todo) => todo.status == 1));
  }, [todos]);

  const fetchTodos = async () => {
    const res = await fetch(api_base);
    const data = await res.json();
    return data;
  };

  const fetchTodo = async (id) => {
    const res = await fetch(api_base + `/${id}`);
    const data = await res.json();
    console.log(data);
    return data;
  };

  const addTodo = async (todo) => {
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    const data = await res.json();

    setTodos([...todos, data]);
  };

  const deleteTodos = async (id) => {
    await fetch(api_base + `/${id}`, {
      method: "DELETE",
    });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodos = async (id) => {
    const selectedUpdateTodo = await fetchTodo(id);
    const updatedTodo = {
      ...selectedUpdateTodo,
      status: selectedUpdateTodo.status === 1 ? 0 : 1,
    };
    const res = await fetch(api_base + `/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    const data = await res.json();
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, status: data.status } : todo
      )
    );
    setComplete(todos.filter((todo) => todo.status == 1));
  };

  return (
    <div className="App">
      <h1>My To do List</h1>
      <h4>Today's Tasks</h4>
      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div className={"todo " + (todo.status === 1 ? " gone" : "")}>
              <div className="text">
                {todo.title + " - " + todo.description}
              </div>

              <div
                className="done-todo"
                key={todo.id}
                onClick={() => updateTodos(todo.id)}
              >
                v
              </div>
              <div className="delete-todo" onClick={() => deleteTodos(todo.id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p>There is no task</p>
        )}
      </div>

      <Complete completeTodo={complete} deleteTodos={deleteTodos} />
      <AddTodo onAdd={addTodo} />
    </div>
  );
}

export default App;
