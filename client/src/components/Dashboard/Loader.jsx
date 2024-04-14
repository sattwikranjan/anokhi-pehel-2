import React from "react";
import "./Loader.css"; // Make sure to import the CSS file where your loader styles are defined

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="background-blur"></div>
      <div className="loader">
        <div className="inner"></div>
      </div>
    </div>
  );
};

export default Loader;
