import React from "react";
import "./Stats.css";

import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import WaveLoader from "../WaveLoader/WaveLoader";
import { SPEED_TEST_TYPE } from "../../constants/app-constants";

const Stats = ({ currentTestType, downloadSpeed, uploadSpeed }) => {
  return (
    <div className="stats-container">
      {currentTestType && (
        <>
          <div className="dowload-speed-wrapper">
            <div className="download-speed-container">
              <div className="stat-header">
                <BiChevronDown className="stat-icon" />
                <span className="stat-title">DOWNLOAD</span>
              </div>
              {downloadSpeed ? (
                <p className="stat-value">{downloadSpeed}</p>
              ) : (
                <WaveLoader containerHeight="55px" />
              )}
              <p className="stat-unit"> Mbps</p>
            </div>
          </div>
          <div
            className="upload-speed-wrapper"
            style={{
              flex: currentTestType === SPEED_TEST_TYPE.DOWNLOAD ? 0 : 1,
              width: currentTestType === SPEED_TEST_TYPE.DOWNLOAD ? 0 : "auto",
            }}
          >
            <div
              className="upload-speed-container"
              style={{
                transform:
                  currentTestType === SPEED_TEST_TYPE.DOWNLOAD
                    ? "scale(0)"
                    : "scale(1)",
              }}
            >
              <div className="stat-header">
                <BiChevronUp className="stat-icon" />
                <span className="stat-title">UPLOAD</span>
              </div>
              {uploadSpeed ? (
                <p className="stat-value">{uploadSpeed}</p>
              ) : (
                <WaveLoader containerHeight="55px" />
              )}

              <p className="stat-unit"> Mbps</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
