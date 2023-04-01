import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./contexts/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Profile from "./components/Profile";
import Password from "./components/Password";
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <NoteState>
      <BrowserRouter>
        <div>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact index element={<Home showAlert={showAlert} />} />
              <Route
                path="/profile"
                element={<Profile showAlert={showAlert} />}
              />
              <Route
                path="/passwordupdate"
                element={<Password showAlert={showAlert} />}
              />
              <Route exact path="/about" element={<About />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
