import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


function ModalReact(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buttonStyle = { color: props.buttonTextColor, border: "0px", background: "transparent" }

  const handleConfirm = () => {
    props.onConfirm();
    handleClose();
  };
  return (
    <>
      <button variant="button" style={buttonStyle} onClick={handleShow}>
        {props.buttonText}
      </button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {props.cancelText}
          </Button>
          <Button variant={props.confirmVariant} onClick={handleConfirm}>
            {props.confirmText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>  
  );
}

ModalReact.defaultProps = {
  buttonText: "Delete",
  buttonTextColor: "red",
  confirmText: "Delete",
  confirmVariant: "danger",
  cancelText: "Cancel"
}

export default ModalReact;