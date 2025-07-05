import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { singupHandler } from "../../services";
import { useAuth } from "../../contexts";

const singupFormDetails = [
  {
    id: 1,
    label: "First Name",
    name: "firstName",
    placeholder: "first name",
    type: "text",
  },

  {
    id: 2,
    label: "Last Name",
    name: "lastName",
    placeholder: "last name",
    type: "text",
  },

  {
    id: 3,
    label: "Email Address",
    name: "email",
    placeholder: "email",
    type: "email",
  },

  {
    id: 4,
    label: "Password",
    name: "password",
    placeholder: "password",
    type: "password",
  },

  {
    id: 5,
    label: "Confirm Password",
    name: "confirmPassword",
    placeholder: "confirm password",
    type: "password",
  },
];

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAndConditions: false,
};

export const Signup = () => {
  const [formData, setFormData] = useState(initialFormData);

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
      <main className="container-flex-center">
        <form
          onSubmit={(e) =>
            singupHandler({
              e,
              formData,
              setUserData,
            })
          }
          className="auth-form m-4 p-4 radius-5 shadow"
        >
          <h4 className="h4 mb-4 text-center">Singup</h4>

          {singupFormDetails.map(({ id, label, name, type, placeholder }) => {
            return (
              <label key={id}>
                <div className="mb-1">{label}</div>
                <input
                  onChange={changeHandler}
                  type={type}
                  name={name}
                  placeholder={`Enter your ${placeholder}`}
                  value={formData[name]}
                  className="px-2 py-1 mb-2 input-box auth-input"
                  required
                />
              </label>
            );
          })}

          <div className="container-flex">
            <label>
              <input
                onChange={toggleHandler}
                name="termsAndConditions"
                type="checkbox"
                checked={formData.termsAndConditions}
                required
              />
              <span className="avoid-text-highlight">
                {" "}
                I accept all Terms & Conditions
              </span>
            </label>
          </div>

          <button className="btn mt-2 primary-solid-btn">
            Create New Account
          </button>

          <Link to="/login" className="container-flex-center text-color mt-3">
            Already have an account
            <i className="right-arrow-icon bx bx-chevron-right"></i>
          </Link>
        </form>
      </main>
    </>
  );
};
