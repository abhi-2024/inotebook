import React, { useState, useRef } from "react";
import { useEffect } from "react";
import $ from "jquery";
const Profile = (props) => {
  const backRef = useRef(null);

  const [user, setUser] = useState({
    eid: "",
    ename: "",
    eemail: "",
    edate: "",
  });
  const fetchUser = async () => {
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    });
    const userjson = await response.json();
    console.log(userjson);
    setUser({
      eid: userjson._id,
      ename: userjson.name,
      eemail: userjson.email,
      edate: userjson.date,
    });
    console.log(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const [editbtn, setEditbtn] = useState(false);

  const handleEdit = () => {
    if (editbtn === false) {
      setEditbtn(true);
      $(() => {
        $("#pfpView").hide();
        $("#pfpEdit").show();
        $("#header").text("Edit");
        $("#header").text("Edit");
        $("#btnEdit").text("View");
        $("#btnSave").show();
      });
    } else {
      setEditbtn(false);
      $(() => {
        $("#pfpView").show();
        $("#pfpEdit").hide();
        $("#header").text("Profile");
        $("#btnEdit").text("Edit");
        $("#btnEdit").show();
        $("#btnSave").hide();
      });
    }
  };
  const handleUpdate = async () => {
    //API CALL
    const response = await fetch(
      `http://localhost:5000/api/auth/updateuser/${user.eid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.eemail, name: user.ename }),
      }
    );
    const json = await response.json();
    if (json.success) {
      props.showAlert(json.Message, "success");
      backRef.current.click();
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
                    Profile
                  </h1>
                </div>
                <div className="card-body">
                  <table className="table">
                    <tbody id="pfpView">
                      <tr>
                        <th scope="row">Name</th>
                        <td>{user.ename}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>{user.eemail}</td>
                      </tr>
                      <tr>
                        <th scope="row">Registered on</th>
                        <td>{user.edate}</td>
                      </tr>
                    </tbody>
                    <tbody style={{ display: "none" }} id="pfpEdit">
                      <tr>
                        <th>ID</th>
                        <td>
                          <input
                            className="form-control"
                            disabled
                            onChange={handleOnChange}
                            value={user.eid}
                            name="eid"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Name</th>
                        <td>
                          <input
                            className="form-control"
                            onChange={handleOnChange}
                            value={user.ename}
                            name="ename"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>
                          <input
                            className="form-control"
                            onChange={handleOnChange}
                            value={user.eemail}
                            name="eemail"
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Registered on</th>
                        <td>
                          <input
                            disabled
                            onChange={handleOnChange}
                            className="form-control"
                            value={user.edate}
                            name="edate"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="text-center">
                    <button
                      onClick={handleEdit}
                      id="btnEdit"
                      className="btn btn-primary me-2"
                      ref={backRef}
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleUpdate}
                      id="btnSave"
                      className="btn btn-primary"
                      style={{ display: "none" }}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
