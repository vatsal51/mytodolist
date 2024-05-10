import React, { useState } from "react";
import jsonData from "./celebs.json";
import ConfirmationDialog from "./ConfirmationDialog";
import closeIcon from "./cross-circle.svg";
import tick from "./tick.svg";
import edit from "./edit.svg";
import deleteIcon from "./delete.svg";
import downArrow from "./down-arrow.svg";

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - dobDate.getFullYear();

  if (
    currentDate.getMonth() < dobDate.getMonth() ||
    (currentDate.getMonth() === dobDate.getMonth() &&
      currentDate.getDate() < dobDate.getDate())
  ) {
    age--;
  }

  return age;
}

const DataListComponent = ({ user, onSave, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [originalUser] = useState({ ...user });
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDetailsVisible, setisDetailsVisible] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    onSave(editedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedUser({ ...originalUser });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleDeleteClick = () => {
    setIsConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    onDelete(user.id);
    setIsConfirmingDelete(false);
  };

  const handleCancelDelete = () => {
    setIsConfirmingDelete(false);
  };

  const handleToggle = () => {
    setisDetailsVisible(!isDetailsVisible);
    if (isEditing) setIsEditing(!isEditing);
  };

  let actionButtons;

  if (isConfirmingDelete) {
    actionButtons = (
      <ConfirmationDialog
        message="Are you sure you want to delete?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    );
  } else if (isEditing) {
    actionButtons = (
      <div className="listEdit">
        <img onClick={handleSaveClick} src={tick} alt="Tick Icon" />
        <img onClick={handleCancelClick} src={closeIcon} alt="Close Icon" />
      </div>
    );
  } else {
    actionButtons = (
      <div className="listAction">
        <img onClick={handleDeleteClick} src={deleteIcon} alt="Delete Icon" />
        <img onClick={handleEditClick} src={edit} alt="Edit Icon" />
      </div>
    );
  }

  return (
    <div className="lists">
      <div key={user.id}>
        <div className="userWrapper">
          <div className="userName">
            <img src={user.picture} alt={user.first} />{" "}
            <p>
              {isEditing ? (
                <input
                  type="text"
                  name="first"
                  value={editedUser.first}
                  onChange={handleInputChange}
                />
              ) : (
                user.first
              )}{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="last"
                  value={editedUser.last}
                  onChange={handleInputChange}
                />
              ) : (
                user.last
              )}
            </p>
          </div>
          <img
            src={downArrow}
            onClick={handleToggle}
            className={`arrow ${isDetailsVisible ? "up" : "down"}`}
            alt="down arrow"
          ></img>
        </div>
      </div>

      <div className={`details ${isDetailsVisible ? "visible" : ""}`}>
        <div>
          <p>Age:</p>{" "}
          {isEditing ? (
            <input
              type="text"
              name="dob"
              value={editedUser.dob}
              onChange={handleInputChange}
            />
          ) : (
            calculateAge(user.dob)
          )}
        </div>

        <div>
          <p>Gender:</p>{" "}
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={editedUser.gender}
              onChange={handleInputChange}
            />
          ) : (
            user.gender
          )}
        </div>

        <div>
          <p>Country:</p>{" "}
          {isEditing ? (
            <input
              type="text"
              name="country"
              value={editedUser.country}
              onChange={handleInputChange}
            />
          ) : (
            user.country
          )}
        </div>

        <div>
          <p>Description:</p>{" "}
          {isEditing ? (
            <textarea
              name="description"
              value={editedUser.description}
              onChange={handleInputChange}
              rows={4}
            />
          ) : (
            user.description
          )}
        </div>
        {actionButtons}
      </div>
    </div>
  );
};

function App() {
  const [data, setData] = useState(jsonData);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSave = (editedUser) => {
    const updatedData = data.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setData(updatedData);
  };

  const handleDelete = (userId) => {
    setData(data.filter((user) => user.id !== userId));
  };

  // Filter the data based on the search term
  const filteredData = data.filter((user) => {
    const fullName = `${user.first} ${user.last}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="App">
      <div className="headerWrapper">
        <h1>User Information</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name"
            className="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="container">
        {filteredData.map((user) => (
          <DataListComponent
            key={user.id}
            user={user}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
