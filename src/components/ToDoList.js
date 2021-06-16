import { useEffect } from "react";

import userService from "../services/user.service";

function ToDoList() {
  useEffect(() => {
    userService.getTodos().then(
      (response) => {
        console.log(response.data);
      },
      (err) => {
        console.error(err);
      }
    );
  });

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
    </div>
  );
}

export default ToDoList;
