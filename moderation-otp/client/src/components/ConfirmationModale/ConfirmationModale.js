import React, { useEffect } from "react";
import Modal from "react-modal";
import "../ConfirmationModale/ConfirmationModale.css";
Modal.setAppElement("#root");

const ConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirm,
  eventTitle,
}) => {
  useEffect(() => {}, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      className="modal"
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
    >
      <div className="header">
        <h2>Confirmer la suppression</h2>
        <p>
          Veux-tu enlever <span>{eventTitle}</span> du planning?
        </p>
      </div>
      <div className="buttons">
        <button onClick={onConfirm}>Oui</button>
        <button onClick={onRequestClose}>Non</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
