import { useFrame, useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";
import { useControls } from "leva";
import { MathUtils, Vector3 } from "three";

export default function Camera(props) {
  const pointRef = useRef();
  const { camera, mouse } = useThree();

  const vec = new Vector3();
}
