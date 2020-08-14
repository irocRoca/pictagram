import React from "react";
import styles from "./modal.module.css";

const Modal = ({ children, open, onClose }) => {
  const handleClose = (e) => {
    if (e.target.classList.contains(styles.backdrop)) {
      e.target.classList.add(styles.fade);
      onClose(false);
    }
  };

  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={handleClose}>
          <div className={styles.modal}>{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
