import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const url = "http://localhost:5000";
  const staticnote = [];
  const [notes, setNotes] = useState(staticnote);

  //Fetch All Notes
  const fetchAllNotes = async () => {
    //API CALL
    const response = await fetch(`${url}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const resJson = await response.json();
    setNotes(resJson);
  };
  //New Notes
  const addNote = async (title, description, tag) => {
    //API CALL
    const response = await fetch(`${url}/api/notes/createnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const resJson = await response.json();
    console.log(resJson);
    //Logic to add new note
    console.log("New Node Added");
    const newNotes = [
      {
        _id: "640f129504b56938dec6996a18fb",
        user: "640f45dfa401a61bb44dc57e",
        title: title,
        description: description,
        tag: tag,
        date: "2023-03-13T21:26:28.887Z",
        __v: 0,
      },
    ];
    setNotes(staticnote.concat(newNotes));
  };

  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${url}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const resJson = await response.json();
    console.log(resJson);

    //Logic to update note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${url}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const resJson = await response.json();
    console.log(resJson);
    //Logic to delete a note
    console.log("Deleting note with id: " + id);
    const newNotes = staticnote.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, fetchAllNotes, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
