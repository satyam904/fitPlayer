import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { logoutHandler } from "../../services";
import "./DropDownList.css";

export const DropDownList = ({ setActiveDropDown }) => {
  const navigate = useNavigate();
  const { setUserData } = useAuth();

  const profileOnClickHandler = () => {
    setActiveDropDown(false);
    navigate("/profile");
  };

  const logoutOnClickHandler = () => {
    logoutHandler({ navigate, setUserData });
    setActiveDropDown(false);
  };

  return (
    <>
      <ul className="drop-down-list radius-5">
        <li onClick={profileOnClickHandler} className="p-2 top-radius-5">
          Profile
        </li>
        <li onClick={logoutOnClickHandler} className="p-2 bottom-radius-5">
          Logout
        </li>
      </ul>
    </>
  );
};
