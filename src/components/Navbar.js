import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link
                  className="btn btn-primary me-2"
                  to={"/login"}
                  type="submit"
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </Link>
                <Link className="btn btn-primary" to={"/signup"} type="submit">
                  Sign-Up
                </Link>
              </div>
            ) : (
              <>
                <Link
                  className="btn btn-primary me-2"
                  to={"/passwordupdate"}
                  type="submit"
                >
                  <i className="fa-solid fa-key"></i> Password
                </Link>
                <Link
                  className="btn btn-primary me-2"
                  to={"/profile"}
                  type="submit"
                >
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
                <button className="btn btn-primary me-2" onClick={handleLogout}>
                  <i className="fa-solid fa-right-to-bracket"></i> Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
