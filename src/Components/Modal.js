import React from "react";

const Modal = ({ children, title, onCloseClick, onEditClick, open }) => {
  return (
    <div className={`modal ${open ? "is-active" : ""}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCloseClick}
          />
        </header>
        <section className="modal-card-body">{children}</section>
        <footer className="modal-card-foot">
          {onEditClick && (
            <button className="button is-primary" onClick={onEditClick}>
              Edit
            </button>
          )}
          {onCloseClick && (
            <button className="button" onClick={onCloseClick}>
              Close
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default Modal;
