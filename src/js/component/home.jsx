import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import TodoItem from "./todo-item.jsx";
//create your first component

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  async function addTodo() {
    const newTodo = todos.concat({
      id: crypto.randomUUID(),
      label: inputValue,
      done: false,
    });
    setTodos(newTodo);
    await fetch("https://playground.4geeks.com/apis/fake/todos/user/josema", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    setInputValue("");
  }

  useEffect(async () => {
    let req = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/josema"
    );
    if (req.ok) {
      let res = await req.json();
      setTodos(res);
    } else {
      await fetch("https://playground.4geeks.com/apis/fake/todos/user/josema", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([]),
      });
    }
  }, []);
  return (
    <div className="container">
      <h1 className="text-center text-black-50" style={{ fontSize: "5rem" }}>
        Todos
      </h1>
      <ListGroup>
        <ListGroup.Item className="p-0">
          <input
            className="container-fluid p-3 border-0"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              console.log(e);
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            placeholder="What do you need to do"
          />
        </ListGroup.Item>
        {todos.map((item) => (
          <TodoItem item={item} todos={todos} setTodos={setTodos} />
        ))}
      </ListGroup>
      <div className="d-flex justify-content-between">
        <p className="text-center">{todos.length} items left</p>{" "}
        <button
          className="btn btn-danger"
          onClick={async () => {
            setTodos([]);
            await fetch(
              "https://playground.4geeks.com/apis/fake/todos/user/josema",
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([]),
              }
            );
          }}
        >
          eliminar Todos
        </button>
      </div>
    </div>
  );
};

export default Home;
