import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [newuser, setNewuser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleOnChange = (e) => {
    setNewuser({ ...newuser, [e.target.name]: e.target.value });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //API CALL
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newuser.name,
        email: newuser.email,
        password: newuser.password,
      }),
    });
    const json = await response.json();
    if (json.success) {
      props.showAlert(json.Message, "success");
      navigate("/login");
    } else {
      props.showAlert(json.Message, "danger");
    }
  };
  return (
    <div className="d-flex align-items-center" style={{ height: "80vh" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-2 ">
            <div className="card">
              <div className="card-header text-center">
                <h1 className="display-6">Sign-up</h1>
              </div>
              <div className="card-body">
                <div className="card-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="row mb-3">
                      <label htmlFor="name" className="col-sm-2 col-form-label">
                        Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          required
                          type="text"
                          className="form-control"
                          id="name"
                          onChange={handleOnChange}
                          name="name"
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="email"
                        className="col-sm-2 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-sm-10">
                        <input
                          required
                          type="email"
                          className="form-control"
                          id="email"
                          onChange={handleOnChange}
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="password"
                        className="col-sm-2 col-form-label"
                      >
                        Password
                      </label>
                      <div className="col-sm-10">
                        <input
                          required
                          type="password"
                          className="form-control"
                          id="password"
                          onChange={handleOnChange}
                          name="password"
                          minLength={8}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="cpassword"
                        className="col-sm-2 col-form-label"
                      >
                        Enter Password Again
                      </label>
                      <div className="col-sm-10">
                        <input
                          required
                          type="password"
                          className="form-control"
                          id="cpassword"
                          onChange={handleOnChange}
                          name="cpassword"
                          minLength={8}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        disabled={newuser.password.localeCompare(
                          newuser.cpassword
                        )}
                        className="btn btn-primary"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
