import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { logoutHandler } from "../../services";
import "./Profile.css";

export const Profile = () => {
  const {
    userData: { user },
    setUserData,
  } = useAuth();
  const navigate = useNavigate();

  const { firstName, lastName, email } = user;

  return (
    <main className="main-container profile-main main-min-height">
      <h2 className="h2 mt-3">My profile</h2>

      <div className="user-profile-card container-flex-y-center mt-4 p-3 radius-5 shadow">
        <FaUserCircle className="profile-icon" />
        <h5 className="h5 pt-2">
          {" "}
          <span>{firstName}</span> <span>{lastName}</span>{" "}
        </h5>
        <div>{email}</div>
        <button
          onClick={() => logoutHandler({ navigate, setUserData })}
          className="btn primary-error-btn mt-2"
        >
          Logout
        </button>
      </div>
    </main>
  );
};
