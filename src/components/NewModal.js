import React from "react";
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
    width: "auto",
    height: "400px",
    maxHeight: "60vh !important",
    maxWidth: "80%",
  },
};

Modal.setAppElement("#root");

export default function NewModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
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

  return (
    <>
      <button id="modal" onClick={openModal}></button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      ></Modal>
    </>
  );
}
