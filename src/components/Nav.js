import React from "react";
import SearchBox from "./SearchBox.js";
import "../styles/Nav.css";

function Nav({ handleSearchChange, handleSubmit }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse row" id="navbarNav">
        <div className="input-group col-8">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">
              DOB
            </span>
          </div>
          <input type="date" className="form-control" id="dobStart" />
          <input type="date" className="form-control" id="dobEnd" />
        </div>
        <div className="search-area col-4">
          <SearchBox
            handleSearchChange={handleSearchChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </nav>
  );
}
export default Nav;
