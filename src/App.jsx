import { Canvas } from "@react-three/fiber";
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
import { Stats, OrbitControls } from "@react-three/drei";
import Loader from "./components/Loader";
import Camera from "./components/Camera";
import Keyboard from "./components/Keyboard";
import Lights from "./components/Lights";
import MoveMouse from "./components/MoveMouse";
import Guitar from "./components/Guitar";
import Rl from "./components/Rl";
import Printer from "./components/Printer";
import Plant from "./components/Plant";
import Drone from "./components/Drone";
import Stack from "./components/Stack";
import { Box } from "@react-three/drei";

export default function App() {
  const [goBack, setGoBack] = useState(false);

  const handleGoBack = (data) => {
    setGoBack(data);
  };

  return (
    <>
      <BrowserRouter>
        <Canvas shadows>
          <Camera position={[6, -1, 3]} rotation={[0, 1, 0]} />
          <Lights />

          <EffectComposer multisampling={0} disableNormalPass={true}>
            {/* <DepthOfField
              focusDistance={0}
              focalLength={0.0}
              bokehScale={2}
              height={460}
            /> */}
            <HueSaturation saturation={0.2} />
            <BrightnessContrast contrast={0.1} />
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
          </EffectComposer>
          <Suspense fallback={<Loader />}>
            <Desk goBack={goBack} />
            <Guitar />
            <Rl />
            <Printer />
            <Plant />
            <Drone />
            <Stack onGoBack={handleGoBack} />
          </Suspense>
          {/* <OrbitControls enableDamping={false} /> */}
          {/* <AdaptiveDpr pixelated />
          <AdaptiveEvents /> */}
        </Canvas>
      </BrowserRouter>
    </>
  );
}
