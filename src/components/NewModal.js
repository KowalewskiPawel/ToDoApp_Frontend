import React, { useEffect, useState } from "react";
import Modal from "react-modal";

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
    width: "50%",
    height: "80%",

    background: "#2D2D2D",
    maxHeight: "60vh !important",
    maxWidth: "80%",
  },
};

Modal.setAppElement("#root");

export default function NewModal() {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [finished, setFinished] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      id: "string",
      name: taskName,
      isDone: finished,
    };

    setTasks((prevState) => [...prevState, newTask]);
    setTaskName("");
    setFinished(false);
  };

  return (
    <>
      <button id="modal" onClick={openModal}></button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <input type="text" placeholder="List name" required />
          <hr />
          {tasks.length > 0
            ? tasks.map((task, index) => {
                return (
                  <div key={index}>
                    <form>
                      <input
                        type="checkbox"
                        id="finished"
                        defaultChecked={task.isDone}
                      />
                      <input
                        type="text"
                        placeholder="Task name"
                        value={task.name}
                        required
                      />
                    </form>
                  </div>
                );
              })
            : ""}
          <form onSubmit={handleSubmit}>
            <input
              type="checkbox"
              id="finished"
              value={finished}
              onChange={(e) => setFinished(e.target.checked)}
              checked={finished}
              defaultChecked={finished}
            />
            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <input type="submit" value="ADD" />
          </form>
        </div>
      </Modal>
    </>
  );
}
