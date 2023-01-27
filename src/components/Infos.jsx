import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import state from "../state.js";
import ArrowInfos from "./ArrowInfos.jsx";
export default function Infos({ showInfos, hideValue }) {
  const sceneRef = useRef();
  const { camera, mouse } = useThree();
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loader.load(
      "./models/infos.glb",
      (d) => {
        console.log(d);
        sceneRef.current.add(d.scene);
        const cv = sceneRef.current.children[0].children.filter((res) =>
          res.name.includes("cv")
        );
        const photo = sceneRef.current.children[0].children.filter((res) =>
          res.name.includes("photo")
        );
        cv.castShadow = false;
        photo.castShadow = false;
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        sceneRef.current.position.x = -5;
        sceneRef.current.position.y = 20;
        sceneRef.current.position.z = 0;
        setLoaded(true);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);
  useEffect(() => {
    if (showInfos) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        -3.7,
        1
      );
    }
  }, [showInfos]);
  useFrame(() => {
    if (hideValue) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        -5,
        1
      );
    }
  });
  const handleClick = (num) => {
    const position = {
      1: {
        cameraPos: [3.18, 8.85, 8.74],
        target: [-1.26, 8.81, 8.72],
      },
      2: {
        cameraPos: [4.85, 8.9, -0.1],
        target: [-1.24, 8.84, -0.12],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };

  useFrame(() => {
    if (showInfos) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        -3.7,
        1
      );
    }
  });

  return (
    <group>
      <mesh scale={1.5} ref={sceneRef} />;
    </group>
  );
}
