import React from "react";
import { SPEED_TEST_TYPE } from "../../constants/app-constants";
import "./SpeedCounter.css";

const SpeedCounter = ({ type, speed }) => {
  return (
    <div className="speed-counter-container ease-in">
      <span
        className={[
          "speed",
          type === SPEED_TEST_TYPE.DOWNLOAD ? "white" : "pink",
        ].join(" ")}
      >
        {speed}
      </span>
      <span
        className={[
          "unit",
          type === SPEED_TEST_TYPE.DOWNLOAD ? "white" : "pink",
        ].join(" ")}
      >
        Mbps
      </span>
    </div>
  );
};

export default SpeedCounter;
