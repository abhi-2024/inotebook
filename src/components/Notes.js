import { useContext, useEffect, React, useRef, useState } from "react";
import noteContext from "../contexts/notes/noteContext";
import AddNote from "./AddNote";
import NotesItem from "./NotesItem";
import { useNavigate } from "react-router-dom";
function Notes(props) {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleOnClick = (e) => {
    refClose.current.click();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    props.showAlert("Notes Updated!!", "success");
  };
  useEffect(() => {
    if (localStorage.getItem("authToken") !== null) {
      fetchAllNotes();
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, [notes]);
  return (
    <>
      {/* Modal Start */}
      {/* <!-- Button trigger modal --> */}
      <button
        style={{ display: "none" }}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Note Edit
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">
                    Title
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Enter note title"
                    value={note.etitle}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">
                    Decription
                  </label>
                  <input
                    onChange={handleOnChange}
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    placeholder="Enter note description"
                    value={note.edescription}
                    required
                  />
                </div>
                <div className="mt-3">
                  <label htmlFor="eTag" className="form-label">
                    Tag
                  </label>
                  <input
                    onChange={handleOnChange}
                    value={note.etag}
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    placeholder="Enter tag for your note"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleOnClick}
                type="button"
                className="btn btn-primary"
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal End */}
      <AddNote showAlert={props.showAlert} />
      <div className="m-3">
        <h1 className="display-3 text-center">Notes List</h1>
        <div className="row">
          <h5 className="mt-5 text-center">
            {notes.length === 0 && "No Notes Has Been Added"}
          </h5>
          {notes.map((note) => {
            return (
              <NotesItem
                key={note._id}
                showAlert={props.showAlert}
                updateNote={updateNote}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Notes;
