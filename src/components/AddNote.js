import React from "react";
import { useContext, useState } from "react";
import noteContext from "../contexts/notes/noteContext";

const AddNote = (props) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const context = useContext(noteContext);
  const { addNote } = context;
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleAddNote = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note Added", "success");
  };

  return (
    <div className="container m-3">
      <div className="card">
        <div className="card-header">
          <h1 className="display-5 text-center">New Note</h1>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              value={note.title}
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="title"
              name="title"
              required
              placeholder="Enter note title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Decription
            </label>
            <input
              value={note.description}
              onChange={handleOnChange}
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Enter note description"
              required
            />

            <div className="mt-3">
              <label htmlFor="tag" className="form-label">
                Tag
              </label>
              <input
                value={note.tag}
                onChange={handleOnChange}
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="Enter tag for your note"
              />
            </div>

            <div className="text-center mt-3">
              <button
                disabled={note.title.length < 3 || note.description.length < 5}
                className="btn btn-primary"
                onClick={handleAddNote}
              >
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
