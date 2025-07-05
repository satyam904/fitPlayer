import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";
import { AiFillCaretUp, AiFillCaretDown } from "react-icons/ai";
import { BiMoon, BiSun } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import logo from "../../logo.png";
import { useAuth, useTheme } from "../../contexts";
import { DropDownList } from "../../components";
import "./Navbar.css";

export const Navbar = ({ pathname, setShowSidebar }) => {
  const { theme, setTheme } = useTheme();
  const {
    userData: { token: isLoggedIn },
  } = useAuth();

  const [activeDropDown, setActiveDropDown] = useState(false);

  const notGridPage = () => {
    return pathname !== "/" && pathname !== "/login" && pathname !== "/signup";
  };

  return (
    <>
      <nav className="nav-bar avoid-text-highlight shadow px-2">
        <div className="left-nav container-flex-align-center">
          {notGridPage() && (
            <HiMenu
              onClick={() => setShowSidebar((prev) => !prev)}
              className="ham-menu-icon cursor-pointer mx-2"
            />
          )}
          <Link to="/" className="h3 container-flex-align-center">
            <img className="logo mr-1" src={logo} alt="logo" />
            <span className="hide text-color">fit</span>
            <span className="hide primary-text-color">Player</span>
          </Link>
        </div>

        <ul className="right-nav container-flex-align-center">
          <li
            onClick={() =>
              setTheme((prev) => (prev === "light" ? "dark" : "light"))
            }
            className="pt-1 nav-icons cursor-pointer"
          >
            {theme === "light" ? <BiMoon /> : <BiSun />}
          </li>
          <li>
            {isLoggedIn ? (
              <div className="user cursor-pointer avoid-text-highlight">
                <div onClick={() => setActiveDropDown(!activeDropDown)}>
                  {activeDropDown ? (
                    <AiFillCaretUp className="mb-1" />
                  ) : (
                    <AiFillCaretDown className="mb-1" />
                  )}
                  <HiOutlineUser className="nav-icons" />
                </div>
                {activeDropDown && (
                  <DropDownList setActiveDropDown={setActiveDropDown} />
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-radius primary-solid-btn container-flex-align-center"
              >
                <FaUserCircle className="mr-1" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
