import React from "react";
import noteContext from "../contexts/notes/noteContext";
import { useContext } from "react";

const NotesItem = (props) => {
  const { note, updateNote } = props;
  const { title, description } = note;
  const context = useContext(noteContext);

  const { deleteNote } = context;
  const handleDeleteClick = () => {
    deleteNote(note._id);
    props.showAlert("Note has been deleted!!", "danger");
  };
  return (
    <div className="col-md-4">
      <div className="card m-3">
        <div className="card-body">
          <h5 className="card-title">
            {title}{" "}
            <i
              onClick={handleDeleteClick}
              className="fa-solid fa-trash me-2"
              style={{ color: "red" }}
            ></i>{" "}
            <i
              onClick={() => {
                updateNote(note);
              }}
              className="fa-solid fa-file-pen me-2"
              style={{ color: "green" }}
            ></i>
          </h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NotesItem;
