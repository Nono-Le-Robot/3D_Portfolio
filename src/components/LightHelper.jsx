import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export default function LightHelper() {
  const pointRef = useRef();
  useControls("Point Light", {
    visible: {
      value: false,
      onChange: (v) => {
        pointRef.current.visible = v;
      },
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        pointRef.current.position.copy(v);
      },
    },
    color: {
      value: "white",
      onChange: (v) => {
        pointRef.current.color = new THREE.Color(v);
      },
    },
  });
  // useHelper(pointRef, THREE.SpotLightHelper, "cyan");

  return (
    <>
      <pointLight
        shadow-mapSize-height={1920}
        shadow-mapSize-width={1920}
        castShadow
        intensity={1}
        ref={pointRef}
      >
        <mesh>
          <sphereGeometry args={[2]}></sphereGeometry>
        </mesh>
      </pointLight>
    </>
  );
}
