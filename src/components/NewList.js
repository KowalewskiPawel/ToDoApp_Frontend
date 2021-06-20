import React, { useState } from "react";
import Modal from "react-modal";
import useForceUpdate from "use-force-update";

import box from "../assets/box.png";
import checked from "../assets/checked.png";

import userService from "../services/user.service";

const customStyles = {
  content: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "rgb(15, 15, 15)",
    padding: "1rem",
    borderRadius: "5px",
    boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    width: "auto",
    height: "80%",

    background: "#2D2D2D",
    maxHeight: "60vh !important",
    maxWidth: "80%",
  },
};

const listStyle = {
  width: "95%",
  height: "auto",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  borderBottom: "solid orange 1px",
  marginBottom: "0.6rem",
};

Modal.setAppElement("#root");

export default function NewList(props) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [listName, setListName] = useState("");
  const [finished, setFinished] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  const [message, setMessage] = useState("");

  const forceUpdate = useForceUpdate();

  function openModal() {
    setIsOpen(true);
    document.getElementById("root").style.filter = "blur(5px)";
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    document.getElementById("root").style.filter = "blur(0px)";
  }

  const handleAddTask = (event) => {
    event.preventDefault();

    const newTask = {
      name: taskName,
      isDone: finished,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setTaskName("");
    setFinished(false);
  };

  const removeTask = (taskName) => {
    const newList = tasks.filter((task) => {
      return task.name !== taskName;
    });
    setTasks([...newList]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!listName) {
      setMessage("Please enter the name of the list");
      return;
    }

    const pubDate = new Date();

    userService.addTodos(listName, tasks, pubDate).then(
      (response) => {
        props.refreshList();
        closeModal();
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return (
    <>
      <div id="newList" onClick={openModal}>
        <div id="hor"></div>
        <div id="ver"></div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modal">
          <input
            type="text"
            placeholder="List name"
            onChange={(e) => setListName(e.target.value)}
            id="listName"
            required
          />
          <hr />
          {tasks.length > 0
            ? tasks.map((task, index) => {
                return (
                  <div key={index}>
                    <form>
                      <input
                        style={{
                          display: "none",
                        }}
                        type="checkbox"
                        id={`task-${index}`}
                        onChange={() => {
                          task.isDone = !task.isDone;
                          forceUpdate();
                        }}
                        defaultChecked={task.isDone}
                      />
                      <label for={`task-${index}`}>
                        <img
                          style={{
                            transform: "scale(0.7)",
                            marginTop: "0.1rem",
                            marginLeft: "0.1rem",
                          }}
                          src={!task.isDone ? box : checked}
                          alt="box"
                        />
                      </label>
                      <input
                        id="taskName"
                        type="text"
                        placeholder="Task name"
                        onChange={(e) => (task.name = e.target.value)}
                        defaultValue={task.name}
                      />
                    </form>
                    <button id="remove" onClick={() => removeTask(task.name)}>
                      REMOVE
                    </button>
                  </div>
                );
              })
            : ""}
          <form onSubmit={handleAddTask}>
            <input
              style={{
                display: "none",
              }}
              type="checkbox"
              id="finished"
              value={finished}
              onChange={(e) => setFinished(e.target.checked)}
              checked={finished}
            />
            <label for="finished">
              <img
                style={{
                  transform: "scale(0.7)",
                  marginTop: "0.1rem",
                  marginLeft: "0.1rem",
                }}
                src={!finished ? box : checked}
                alt="box"
              />
            </label>
            <input
              id="taskName"
              type="text"
              placeholder="Task name"
              value={taskName}
              style={listStyle}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <input id="add" type="submit" value="ADD" />
          </form>
          {message ? <p>{message}</p> : ""}
          <button id="cancel" onClick={() => closeModal()}>
            CANCEL
          </button>
          <button id="save" onClick={handleSubmit}>
            SAVE
          </button>
        </div>
      </Modal>
    </>
  );
}
