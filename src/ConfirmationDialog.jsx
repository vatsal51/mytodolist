import React from "react";
import xmark from "./x-mark.svg";
import "./DeleteConfirmationDialog.css";

const DeleteConfirmationDialog = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-confirmation-dialog">
      <div className="dialog-header">
        <p>Are you sure you want to delete this user?</p>
        <img
          className="close-icon"
          src={xmark}
          alt="close icon"
          onClick={onCancel}
        />
      </div>
      <div className="dialog-content">
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn delete-btn" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
