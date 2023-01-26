import { Canvas, extend, useThree } from "@react-three/fiber";
import Desk from "./components/Desk";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as THREE from "three";
import {
  HueSaturation,
  EffectComposer,
  BrightnessContrast,
  DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import Loader from "./components/Loader";
import Lights from "./components/Lights";
import Guitar from "./components/Guitar";
import Rl from "./components/Rl";
import Printer from "./components/Printer";
import Plant from "./components/Plant";
import Drone from "./components/Drone";
import Stack from "./components/Stack";
import CameraControls from "./components/CameraControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Vr from "./components/Vr";
import Camping from "./components/Camping";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
extend({ OrbitControls });

export default function App() {
  const [fullscreen, setFullscreen] = useState(false);

  function enterFullScreen(element) {
    setFullscreen(!fullscreen);
    if (fullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Safari
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
  }
  const fullScreenBtn = document.querySelector("#fullscreen-btn");
  const myDocument = document.documentElement;
  const Orbit = () => {
    const { camera, gl } = useThree();
    return (
      <orbitControls
        attach="orbitControls"
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
        args={[camera, gl.domElement]}
      />
    );
  };

  return (
    <>
      <BrowserRouter>
        <Loader />
        <button id="fullscreen-btn" onClick={() => enterFullScreen(myDocument)}>
          FullScreen
        </button>
        <div>
          <button id="skip-intro">Skip</button>
        </div>
        <Canvas id="main" shadows>
          <Orbit />
          {/* <OrbitControls enableDamping={false} /> */}
          <CameraControls />
          {/* <Camera position={[6, -1, 3]} rotation={[0, 1, 0]} /> */}
          <Lights />

          <EffectComposer multisampling={0} disableNormalPass={true}>
            {/* <DepthOfField
              focusDistance={0}
              focalLength={0.1}
              bokehScale={2}
              height={460}
            /> */}
            <HueSaturation saturation={0.2} />
            <BrightnessContrast contrast={0.1} />
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
          </EffectComposer>
          <Suspense fallback={<Loader />}>
            <Desk />
            <Stack />
            <Guitar />
            <Rl />
            <Printer />
            <Plant />
            <Drone />
            <Vr />
            <Camping />
          </Suspense>
          {/* <AdaptiveDpr pixelated />
          <AdaptiveEvents /> */}
        </Canvas>
      </BrowserRouter>
    </>
  );
}
