import { useEffect, useState } from "react";

import userService from "../services/user.service";

import NewModal from "./NewModal";

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
          let comp = 0;
          for (let tasks of todo.task) {
            if (tasks.isDone) {
              comp++;
            }
          }
          return (
            <div className="todo" key={index}>
              <span id="todoName">{todo.name}</span>
              <em id="createdAt">Created at: {date}</em>
              <span id="tasksCount">
                Completed: {comp} Uncompleted: {todo.task.length - comp} All:{" "}
                {todo.task.length}
              </span>
            </div>
          );
        })
      )}
      <NewModal />
    </div>
  );
}

export default ToDoList;
