import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import state from "../state";
import * as THREE from "three";
import sound from "../sounds/mouse-click.mp3";

export default function BtnProjects({ firstEnd }) {
  const [startSoundClick, setStartSoundClick] = useState(false);
  useEffect(() => {
    if (startSoundClick) {
      playSoundClick();
      setStartSoundClick(false);
    }
  }, [startSoundClick]);

  function playSoundClick() {
    new Audio(sound).play();
  }

  // Récupérer la référence de la scène
  const sceneRef = useRef(null);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [leaveBtn, setLeaveBtn] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduceLight, setReduceLight] = useState(false);
  const [lights, setLights] = useState([]);
  const { camera, mouse } = useThree();
  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/btn-projets.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.position.x = -1;
        sceneRef.current.position.y = -1.2;
        sceneRef.current.position.z = -1.8;
        sceneRef.current.rotation.x = -Math.PI / 2;
        sceneRef.current.rotation.y = -Math.PI / 2;
        sceneRef.current.rotation.z = -Math.PI / 2;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);
  useFrame((state, delta) => {
    if (firstEnd) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        0.35,
        0.1
      );
      if (hoverBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.25,
          0.1
        );
      }
      if (leaveBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.33,
          0.1
        );
      }
    }

    const ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, camera);

    // Check if the ray intersects with the mesh
    const intersects = ray.intersectObjects([sceneRef.current]);
    if (intersects.length > 0) {
      setHover(true);
    } else {
      setHover(false);
    }
  });

  // useFrame(() => {
  //   if (reduceLight) {
  //     lights.forEach((light) => {
  //       light.intensity = MathUtils.lerp(light.intensity, 0.15, 0.05);
  //     });
  //   }
  // });

  let scale = 0.12;
  const handleClick = (num) => {
    const lightsSelector = sceneRef.current.parent.children.filter(
      (res) => res.isLight === true
    );
    setLights(lightsSelector);
    setReduceLight(true);
    const position = {
      1: {
        cameraPos: [39.64, 4.48, 15.57],
        target: [39.53, 4.37, 16.08],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };

  return (
    <mesh
      position={[0.45, -1.2, -1.5]}
      rotation={[0, -1.57, 0]}
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        document.querySelector("canvas").style.cursor = "pointer";
        // e.stopPropagation();
        setHoverBtn(true);
        setLeaveBtn(false);
      }}
      onPointerOut={(e) => {
        document.querySelector("canvas").style.cursor = "default";
        // e.stopPropagation();
        setLeaveBtn(true);
        setHoverBtn(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setStartSoundClick(true);
        handleClick(1);
      }}
      ref={sceneRef}
    ></mesh>
  );
}
