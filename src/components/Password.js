import React, { useState, useEffect } from "react";

const Password = (props) => {
  const [user, setUser] = useState({
    eid: "",
  });
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const json = await response.json();
    setUser({
      eid: json._id,
    });
  };
  useEffect(() => {
    fetchUser();
    //eslint-disable-next-line
  }, []);

  const [password, setPassword] = useState({
    opass: "",
    npass: "",
    cpass: "",
  });
  const handleOnChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.cpass !== password.npass) {
      props.showAlert("Password don't match", "danger");
    } else if (password.cpass === password.opass) {
      props.showAlert(
        "New Password cannot be similar to the old password",
        "danger"
      );
    } else {
      const response = await fetch(
        `http://localhost:5000/api/auth/updatepassword/${user.eid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            opass: password.opass,
            npass: password.npass,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        props.showAlert("Password Updated Successfully", "success");
      } else {
        props.showAlert(json.Message, "danger");
      }
    }
  };
  return (
    <>
      <div className="d-flex align-items-center mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-3">
              <div className="card">
                <div className="card-header">
                  <h1 className="display-6 text-center" id="header">
                    Password
                  </h1>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="opass" className="form-label">
                        Old Password
                      </label>
                      <input
                        required
                        onChange={handleOnChange}
                        type="password"
                        value={password.opass}
                        className="form-control"
                        id="opass"
                        name="opass"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="npass" className="form-label">
                        New Password
                      </label>
                      <input
                        required
                        minLength={8}
                        onChange={handleOnChange}
                        type="password"
                        className="form-control"
                        id="npass"
                        name="npass"
                        value={password.npass}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="cpass" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        required
                        minLength={8}
                        type="password"
                        onChange={handleOnChange}
                        className="form-control"
                        id="cpass"
                        name="cpass"
                        value={password.cpass}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Password;
