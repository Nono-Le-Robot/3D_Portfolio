import { useFrame, useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { MathUtils, Vector3 } from "three";

export default function Camera(props) {
  const pointRef = useRef();
  const { camera, mouse } = useThree();

  useControls("Camera Position", {
    visible: {
      value: false,
      onChange: (v) => {
        camera.visible = v;
      },
    },
    position: {
      x: 2,
      y: 0,
      z: 0,
      onChange: (v) => {
        camera.position.copy(v);
      },
    },
  });

  const vec = new Vector3();

  camera.position.x = props.position[0];
  camera.position.y = props.position[1];
  camera.position.z = props.position[2];
  camera.rotation.x = props.rotation[0];
  camera.rotation.y = props.rotation[1];
  camera.rotation.z = props.rotation[2];
  useFrame((state) => {
    // state.camera.position.lerp(vec.set(4, 0, 0), 0.005);
  });
}
