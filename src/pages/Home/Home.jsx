import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../../logo.png";

export const Home = () => {
  return (
    <>
      <main className="main-min-height container-flex-justify-center">
        <div className="hero container-flex-align-center text-center p-1">
          <h2 className="h2 mb-2 container-flex-align-center">
            <img className="hero-logo mr-1" src={logo} alt="logo" />
            <span className="text-color">fit</span>
            <span className="primary-text-color">Player</span>
          </h2>
          <h1 className="h1 mb-3">
            Get fit and healthy
            <br /> to make your tomorrows better.
          </h1>

          <Link to="/videos">
            <button className="btn btn-radius primary-solid-btn p-3">
              Browse Videos
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};
