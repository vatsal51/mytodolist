import React from 'react';
import './DeleteConfirmationDialog.css'; // Import a CSS file to style the dialog

const DeleteConfirmationDialog = ({ onCancel, onConfirm }) => {
  return (
    <div className="delete-confirmation-dialog">
      <div className="dialog-header">
      <p>Are you sure you want to delete this user?</p>
        <button className="close-icon" onClick={onCancel}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
<path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
</svg>{/* You can use a close icon from a library like FontAwesome */}
        </button>
      </div>
      <div className="dialog-content">
        
        <button className='btn' onClick={onCancel}>Cancel</button>
        <button className='btn delete-btn' onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationDialog;
