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
extend({ OrbitControls });

export default function App() {
  const Orbit = () => {
    const { camera, gl } = useThree();
    return (
      <orbitControls
        attach="orbitControls"
        // enablePan={false}
        // enableRotate={false}
        // enableZoom={false}
        args={[camera, gl.domElement]}
      />
    );
  };
  return (
    <>
      <BrowserRouter>
        <Loader />
        <Canvas shadows>
          <Orbit />
          {/* <OrbitControls enableDamping={false} /> */}
          <CameraControls />
          {/* <Camera position={[6, -1, 3]} rotation={[0, 1, 0]} /> */}
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
            <Desk />
            <Guitar />
            <Rl />
            <Printer />
            <Plant />
            <Drone />
            <Stack />
          </Suspense>

          {/* <AdaptiveDpr pixelated />
          <AdaptiveEvents /> */}
        </Canvas>
      </BrowserRouter>
    </>
  );
}
