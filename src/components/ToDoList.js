import { useEffect, useState } from "react";

import userService from "../services/user.service";

function ToDoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    userService.getTodos().then(
      (response) => {
        console.log(response.data);
        setTodos([...response.data]);
      },
      (err) => {
        console.error(err);
      }
    );
  }, []);

  return (
    <div className="todoForm">
      <input type="text" placeholder="Search" />
      <select name="sortBy" id="sortList">
        <option>Sort by</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
        <option value="Completed">Completed Tasks</option>
        <option value="Uncompleted">Uncompleted Tasks</option>
      </select>

      {todos.length < 1 ? (
        <p>There are no To-Do lists</p>
      ) : (
        todos.map((todo, index) => {
          let tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(todo.published_at)
          );
          let date = tempDate.split("/").join("-");
          for (let tasks of todo.task)
            return (
              <div key={index}>
                <span>{todo.name}</span>
                <em>Created at: {date}</em>
                <span>All: {todo.task.length}</span>
              </div>
            );
        })
      )}
    </div>
  );
}

export default ToDoList;
