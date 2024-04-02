import React from "react";
import Modal from "react-bootstrap/Modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "500px",
    width: "100%",
    padding: "50px",
    fontSize: "20px",
    backgroundColor: "lightblue",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export const TimeoutWarningModal = ({ isOpen, onRequestClose }) => {
  const onLogOffCall = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Modal show={isOpen} style={customStyles} contentLabel="Example Modal">
        <h2>Session Timeout</h2>
        <div>
          You're being timed out due to inactivity. Please choose to stay signed
          in or to logoff. Otherwise, you will be logged off automatically
        </div>
        <br />
        <button className="secondary" onClick={onLogOffCall}>
          Log off
        </button>
        <button className="primary" onClick={onRequestClose}>
          Stay Logged In
        </button>
      </Modal>
    </div>
  );
};
