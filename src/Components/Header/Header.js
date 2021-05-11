import React from "react";
import "./Header.css";

import { IoTimerOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="header">
      <p className="app-title">SpeedTest</p>
      <IoTimerOutline className="app-icon" />
    </header>
  );
};

export default Header;
