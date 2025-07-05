import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useAuth } from "../../contexts";
import { loginHandler } from "../../services";

const loginFormDetails = [
  {
    id: 1,
    label: "Email Address",
    name: "email",
    type: "email",
  },

  {
    id: 2,
    label: "Password",
    name: "password",
    type: "password",
  },
];

const initialFormData = {
  email: "",
  password: "",
  rememberMe: false,
};

const testCredentials = {
  email: "reachout.amansingh@gmail.com",
  password: "amansingh",
  rememberMe: true,
};

export const Login = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [btnLoader, setBtnLoader] = useState(false);

  const { email, password } = formData;

  const {
    userData: { token },
    setUserData,
  } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || -1;

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <>
      {token && <Navigate to={from} replace />}
      <main className="main-min-height container-flex-center">
        <form
          onSubmit={(e) =>
            loginHandler({
              e,
              setBtnLoader,
              email,
              password,
              setUserData,
            })
          }
          className="auth-form p-4 radius-5 shadow"
        >
          <h4 className="h4 mb-4 text-center">Login</h4>

          {loginFormDetails.map(({ id, label, name, type }) => {
            return (
              <label key={id}>
                <div className="mb-1">{label}</div>
                <input
                  onChange={changeHandler}
                  type={type}
                  name={name}
                  placeholder={`Enter your ${name}`}
                  value={formData[name]}
                  className="px-2 py-1 mb-3 input-box auth-input"
                  required
                />
              </label>
            );
          })}

          <div className="container-flex">
            <label>
              <input
                onChange={toggleHandler}
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
              />
              <span className="avoid-text-highlight"> Remember me</span>
            </label>
          </div>

          <button className="btn mt-2 primary-solid-btn">
            {btnLoader ? (
              <ClipLoader color="#fff" speedMultiplier={2} size={14} />
            ) : (
              "Login"
            )}
          </button>
          <button
            onClick={() => setFormData(testCredentials)}
            type="button"
            className="btn mt-2 primary-solid-btn"
          >
            Use test credentials
          </button>

          <Link to="/signup" className="container-flex-center text-color mt-3">
            Create New Account
            <i className="right-arrow-icon bx bx-chevron-right"></i>
          </Link>
        </form>
      </main>
    </>
  );
};
