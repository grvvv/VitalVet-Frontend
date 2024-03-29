import React from "react";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="confirmation-dialog">
        <p>{message}</p>
        <button id="yes" onClick={onConfirm}>Delete</button>
        <button id="no" onClick={onCancel}>Cancel</button>
      </div>
    </div>
    
  );
};

export default ConfirmationDialog;