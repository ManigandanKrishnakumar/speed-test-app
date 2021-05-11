/* eslint-disable no-undef */
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  AmbientLight,
  Clock,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from "three";
import Header from "./Components/Header/Header";
import NetworkProvider from "./Components/NetworkProvider/NetworkProvider";
import GoButton from "./Components/GoButton/GoButton";
import Stats from "./Components/Stats/Stats";
import SpeedCounter from "./Components/SpeedCounter/SpeedCounter";
import { SPEED_TEST_TYPE } from "./constants/app-constants";

function App() {
  const animationID = useRef(null);
  const prevProgress = useRef(null);

  const [isAnimate, setIsAnimate] = useState(false);
  const [showSphere, setShowSphere] = useState(false);
  const [speedTestType, setSpeedTestType] = useState(null);
  const [speed, setSpeed] = useState(0);
  const [downLoadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [buttonText, setButtonText] = useState("GO");

  useEffect(() => {
    render3D();
    SoMApiInit();
  }, [isAnimate, showSphere, speedTestType]);

  /**
   * Render 3d spehere
   */
  const render3D = useCallback(() => {
    if (showSphere) {
      const container = document.getElementById("three-js-container");
      const wrapper = document.getElementById("canvas-wrapper");
      const width = wrapper.offsetWidth - 10;
      const height = wrapper.offsetHeight - 10;

      const renderer = new WebGLRenderer({
        canvas: container,
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);

      // Clock
      let clock = new Clock();

      // Camera
      const camera = new PerspectiveCamera(35, width / height, 0.1, 3000);

      // Scene
      const scene = new Scene();

      // Lights
      const ambientLight = new AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new PointLight(0xffffff, 0.5);
      scene.add(pointLight);

      // Geometrys
      const material = new PointsMaterial({
        color: speedTestType === SPEED_TEST_TYPE.DOWNLOAD ? 0x249ade : 0xe53d8b,
        size: 10,
      });
      const sphere = new SphereGeometry(230, 34, 34);
      const sphereMesh = new Points(sphere, material);
      sphereMesh.position.set(0, 0, -1000);
      scene.add(sphereMesh);

      const scaleDelimeter = 0.0015;

      const animate = () => {
        animationID.current = requestAnimationFrame(animate);
        sphereMesh.rotation.y += 0.01;
        sphereMesh.position.z += 0.01;

        const t = clock.getElapsedTime();
        if (Math.floor(t) % 2 === 0) {
          sphereMesh.scale.x -= scaleDelimeter;
          sphereMesh.scale.y -= scaleDelimeter;
          sphereMesh.scale.z -= scaleDelimeter;
        } else {
          sphereMesh.scale.x += scaleDelimeter;
          sphereMesh.scale.y += scaleDelimeter;
          sphereMesh.scale.z += scaleDelimeter;
        }

        renderer.render(scene, camera);
      };

      renderer.render(scene, camera);

      //Animation
      isAnimate ? animate() : cancelAnimationFrame(animationID.current);
    }
  }, [isAnimate, showSphere, speedTestType]);

  /**
   * Initialize SpeedOf.me api
   */
  const SoMApiInit = () => {
    SomApi.account = ""; // YOUR API KEY
    SomApi.domainName = "localhost";
    SomApi.config.sustainTime = 4;
    SomApi.config.testServerEnabled = true;
    SomApi.config.userInfoEnabled = true;
    SomApi.config.latencyTestEnabled = false;
    SomApi.config.uploadTestEnabled = true;
    SomApi.config.progress.enabled = true;
    SomApi.config.progress.verbose = true;
    SomApi.onTestCompleted = onTestCompleted;
    SomApi.onError = onError;
    SomApi.onProgress = onProgress;
  };

  /**
   * On completion of speed test call back
   * @param {object} testResult - speed test result
   */
  const onTestCompleted = (testResult) => {
    console.log("---------------- test result --------------");
    console.log(testResult);
    setShowSphere(false);
    setIsAnimate(false);
    setUploadSpeed(testResult.upload);
    setButtonText("RESTART");
    resetCanvasWrapperClass();
  };

  /**
   * On error of speedof.me api call back
   * @param {object} error - Speed test api error
   */
  const onError = (error) => {
    console.log("-------------- error ----------------------");
    console.log(error);
  };

  /**
   * On progress of speedtest api callback
   * @param {object} progress - Speed test progress data
   */
  const onProgress = (progress) => {
    // console.log("-------------- progress ----------------------");
    // console.log(progress);

    if (progress.type !== SPEED_TEST_TYPE.DOWNLOAD && !downLoadSpeed) {
      setDownloadSpeed(prevProgress.current.currentSpeed || null);
    }

    setSpeedTestType(progress.type);
    setSpeed(progress.currentSpeed);
    prevProgress.current = { ...progress };
  };

  /**
   * Remove pink glow from go button sphere after completing the test
   */
  const resetCanvasWrapperClass = () => {
    const canvasWrapper = document.getElementById("canvas-wrapper");
    canvasWrapper.classList.remove(SPEED_TEST_TYPE.UPLOAD);
  };

  return (
    <div className="App">
      <div className="speed-test-container">
        <Header />

        <NetworkProvider />

        <div className="canvas-container">
          <div
            id="canvas-wrapper"
            className={speedTestType ? speedTestType : ""}
          >
            {showSphere ? (
              <canvas id="three-js-container" className="fade-in"></canvas>
            ) : (
              <GoButton
                buttonText={buttonText}
                onClick={() => {
                  setSpeedTestType(null);
                  setDownloadSpeed(null);
                  setUploadSpeed(null);
                  setShowSphere(true);
                  setIsAnimate(true);
                  SomApi.startTest();
                }}
              />
            )}
            {showSphere ? (
              <SpeedCounter type={speedTestType} speed={Math.round(speed)} />
            ) : null}
          </div>
        </div>

        <Stats
          currentTestType={speedTestType}
          downloadSpeed={downLoadSpeed}
          uploadSpeed={uploadSpeed}
        />
      </div>
    </div>
  );
}

export default App;
