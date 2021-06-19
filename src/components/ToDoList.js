import { useEffect, useState } from "react";

import userService from "../services/user.service";

import NewList from "./NewList";
import ViewList from "./ViewList";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [sort, setSort] = useState("");

  const handleChange = (event) => {
    if (!event.target.value.length) {
      setFilteredTodos([]);
    }

    const newList = todos.filter((todo) => {
      const lowerCase = todo.name.toLowerCase();
      const input = event.target.value.toLowerCase();

      return lowerCase.includes(input);
    });

    setFilteredTodos([...newList]);
  };

  const handleDelete = (id) => {
    userService.deleteTodo(id).then(
      (response) => {
        refreshList();
      },
      (err) => {
        console.error(err);
      }
    );
  };

  const refreshList = () => {
    userService.getTodos().then(
      (response) => {
        setTodos([...response.data]);
      },
      (err) => {
        console.error(err);
      }
    );
  };

  function sortList() {
    if (filteredTodos.length > 0) {
      const tempList = [...filteredTodos];
      switch (sort) {
        case "nameDes":
          tempList.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
          break;
        case "nameAsc":
          tempList.sort((a, b) => {
            let nameA = a.name.toUpperCase();
            let nameB = b.name.toUpperCase();
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }
            return 0;
          });
          break;
        case "dateDes":
          tempList.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
          });
          break;
        case "dateAsc":
          tempList.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
          });
          break;
        case "allDes":
          tempList.sort((a, b) => {
            return b.task.length - a.task.length;
          });
          break;
        case "allAsc":
          tempList.sort((a, b) => {
            return a.task.length - b.task.length;
          });
          break;
        case "completedDes":
          tempList.sort((a, b) => {
            let compA = 0;
            let compB = 0;
            for (let tasks of a.task) {
              if (tasks.isDone) {
                compA++;
              }
            }
            for (let tasks of b.task) {
              if (tasks.isDone) {
                compB++;
              }
            }

            return compB - compA;
          });
          break;
        case "completedAsc":
          tempList.sort((a, b) => {
            let compA = 0;
            let compB = 0;
            for (let tasks of a.task) {
              if (tasks.isDone) {
                compA++;
              }
            }
            for (let tasks of b.task) {
              if (tasks.isDone) {
                compB++;
              }
            }

            return compA - compB;
          });
          break;

        case "uncompletedDes":
          tempList.sort((a, b) => {
            let uncompA = 0;
            let uncompB = 0;
            for (let tasks of a.task) {
              if (!tasks.isDone) {
                uncompA++;
              }
            }
            for (let tasks of b.task) {
              if (!tasks.isDone) {
                uncompB++;
              }
            }

            return uncompB - uncompA;
          });
          break;

        case "uncompletedAsc":
          tempList.sort((a, b) => {
            let uncompA = 0;
            let uncompB = 0;
            for (let tasks of a.task) {
              if (!tasks.isDone) {
                uncompA++;
              }
            }
            for (let tasks of b.task) {
              if (!tasks.isDone) {
                uncompB++;
              }
            }

            return uncompA - uncompB;
          });
          break;

        default:
          break;
      }
      setFilteredTodos([...tempList]);
      return;
    }
    const tempList = [...todos];
    switch (sort) {
      case "":
        refreshList();
        break;
      case "nameDes":
        tempList.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      case "nameAsc":
        tempList.sort((a, b) => {
          let nameA = a.name.toUpperCase();
          let nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        });
        break;
      case "dateDes":
        tempList.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
        break;
      case "dateAsc":
        tempList.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        break;
      case "allDes":
        tempList.sort((a, b) => {
          return b.task.length - a.task.length;
        });
        break;
      case "allAsc":
        tempList.sort((a, b) => {
          return a.task.length - b.task.length;
        });
        break;
      case "completedDes":
        tempList.sort((a, b) => {
          let compA = 0;
          let compB = 0;
          for (let tasks of a.task) {
            if (tasks.isDone) {
              compA++;
            }
          }
          for (let tasks of b.task) {
            if (tasks.isDone) {
              compB++;
            }
          }

          return compB - compA;
        });
        break;
      case "completedAsc":
        tempList.sort((a, b) => {
          let compA = 0;
          let compB = 0;
          for (let tasks of a.task) {
            if (tasks.isDone) {
              compA++;
            }
          }
          for (let tasks of b.task) {
            if (tasks.isDone) {
              compB++;
            }
          }

          return compA - compB;
        });
        break;

      case "uncompletedDes":
        tempList.sort((a, b) => {
          let uncompA = 0;
          let uncompB = 0;
          for (let tasks of a.task) {
            if (!tasks.isDone) {
              uncompA++;
            }
          }
          for (let tasks of b.task) {
            if (!tasks.isDone) {
              uncompB++;
            }
          }

          return uncompB - uncompA;
        });
        break;

      case "uncompletedAsc":
        tempList.sort((a, b) => {
          let uncompA = 0;
          let uncompB = 0;
          for (let tasks of a.task) {
            if (!tasks.isDone) {
              uncompA++;
            }
          }
          for (let tasks of b.task) {
            if (!tasks.isDone) {
              uncompB++;
            }
          }

          return uncompA - uncompB;
        });
        break;

      default:
        break;
    }
    setTodos([...tempList]);
  }

  useEffect(() => {
    refreshList();
  }, []);

  useEffect(() => {
    return sortList();
    // eslint-disable-next-line
  }, [sort]);

  return (
    <div className="todoForm">
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => handleChange(event)}
        onKeyUp={(event) => handleChange(event)}
      />
      <select
        name="sortBy"
        id="sortList"
        onChange={(event) => setSort(event.target.value)}
        value={sort}
      >
        <option value="">Sort by</option>
        <option value="nameDes">Name ▼</option>
        <option value="nameAsc">Name ▲</option>
        <option value="dateDes">Date ▼</option>
        <option value="dateAsc">Date ▲</option>
        <option value="allDes">All Tasks ▼</option>
        <option value="allAsc">All Tasks ▲</option>
        <option value="completedDes">Completed Tasks ▼</option>
        <option value="completedAsc">Completed Tasks ▲</option>
        <option value="uncompletedDes">Uncompleted Tasks ▼</option>
        <option value="uncompletedAsc">Uncompleted Tasks ▲</option>
      </select>

      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo, index) => {
          let tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(todo.published_at)
          );
          let date = tempDate.split("/").join("-");
          let comp = 0;
          const todoId = todo.id;
          for (let tasks of todo.task) {
            if (tasks.isDone) {
              comp++;
            }
          }
          return (
            <div className="todo" key={index}>
              <button id="deleteButton" onClick={() => handleDelete(todoId)}>
                DELETE
              </button>
              <ViewList refreshList={refreshList} id={todo.id} />
              <span id="todoName">{todo.name}</span>
              <em id="createdAt">Created at: {date}</em>
              <span id="tasksCount">
                Completed: {comp} Uncompleted: {todo.task.length - comp} All:{" "}
                {todo.task.length}
              </span>
            </div>
          );
        })
      ) : todos.length < 1 ? (
        <p>There are no To-Do lists</p>
      ) : (
        todos.map((todo, index) => {
          let tempDate = new Intl.DateTimeFormat("en-GB").format(
            new Date(todo.published_at)
          );
          let date = tempDate.split("/").join("-");
          let comp = 0;
          const todoId = todo.id;
          for (let tasks of todo.task) {
            if (tasks.isDone) {
              comp++;
            }
          }
          return (
            <div className="todo" key={index}>
              <ViewList refreshList={refreshList} id={todo.id} />
              <button onClick={() => handleDelete(todoId)}>DELETE</button>
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
      <NewList refreshList={refreshList} />
    </div>
  );
}

export default ToDoList;
