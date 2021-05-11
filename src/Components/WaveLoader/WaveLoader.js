import React, { useEffect, useRef } from "react";
import "./WaveLoader.css";

const WaveLoader = ({
  height,
  width,
  size,
  containerHeight,
  containerWidth,
}) => {
  const animationID = useRef(null);
  useEffect(() => {
    animateLoader();
    return () => {
      cancelAnimationFrame(animationID.current);
    };
  }, []);

  const animateLoader = () => {
    const waveAmplitute = 45;
    const waveLength = 30;
    const waveSpeed = 1.5;

    let xs = [];

    for (let i = 5; i <= 295; i++) {
      xs.push(i);
    }

    let t = 0;

    const animate = () => {
      let points = xs.map((x) => {
        let y = 100 + waveAmplitute * Math.sin((x + t) / waveLength);

        return [x, y];
      });

      let path =
        "M" +
        points
          .map((p) => {
            return p[0] + "," + p[1];
          })
          .join(" L");

      document.querySelector("#wave-path").setAttribute("d", path);

      t += waveSpeed;

      animationID.current = requestAnimationFrame(animate);
    };
    animate();
  };

  return (
    <div
      className="wave-loader-container"
      style={{
        height: containerHeight || "150px",
        width: containerWidth || "300px",
      }}
    >
      <svg
        style={{
          height: height || "150px",
          width: width || "300px",
          transform: size ? "scale(" + size + ")" : "scale(0.25)",
        }}
      >
        <path id="wave-path"></path>
      </svg>
    </div>
  );
};

export default WaveLoader;
