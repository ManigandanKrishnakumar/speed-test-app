import React from "react";
import "./GoButton.css";

const GoButton = ({ onClick, buttonText }) => {
  return (
    <div className="go-button fade-in" onClick={onClick}>
      <p className="button-text">{buttonText}</p>
    </div>
  );
};

export default GoButton;
