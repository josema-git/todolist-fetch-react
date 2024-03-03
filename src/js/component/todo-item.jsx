import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

function TodoItem({ item, todos, setTodos }) {
  const [active, setActive] = useState(false);
  return (
    <ListGroup.Item
      className="p-3 d-flex justify-content-between"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      key={item.id}
    >
      <div className="d-flex gap-2">
        <input
          type="checkbox"
          checked={item.done}
          onChange={async () => {
            const newTodo = todos.map((itemList) => {
              if (itemList.id === item.id) {
                itemList.done = !item.done;
              }
              return itemList;
            });

            setTodos(newTodo);
            await fetch(
              "https://playground.4geeks.com/apis/fake/todos/user/josema",
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newTodo),
              }
            );
          }}
        />
        <p className="m-0 d-flex align-items-center">{item.label}</p>
      </div>
      <button
        type="button"
        className="btn btn-link p-0"
        onClick={async () => {
          const newTodo = todos.filter((itemList) => itemList.id !== item.id);
          setTodos(newTodo);
          await fetch(
            "https://playground.4geeks.com/apis/fake/todos/user/josema",
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newTodo),
            }
          );
        }}
      >
        {active ? <FontAwesomeIcon icon={faX} /> : null}
      </button>
    </ListGroup.Item>
  );
}

export default TodoItem;
