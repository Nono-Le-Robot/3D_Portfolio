import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
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

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Canvas shadows>
          <Camera position={[6, 0, 4]} fo />
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
            <Scene />
          </Suspense>
          <OrbitControls
            // minAzimuthAngle={-Math.PI / 0.62}
            // maxAzimuthAngle={Math.PI / 1.35}
            // minPolarAngle={Math.PI / 7}
            // maxPolarAngle={Math.PI - Math.PI / 2.1}
            // enablePan={false}
            // enableZoom={true}
            // enableRotate={true}
            enableDamping={false}
            // maxDistance={13}
            // minDistance={3}
            // regress
          />
          {/* <AdaptiveDpr pixelated />
          <AdaptiveEvents /> */}
          <Keyboard />
          <MoveMouse />
        </Canvas>
      </BrowserRouter>
    </>
  );
}
