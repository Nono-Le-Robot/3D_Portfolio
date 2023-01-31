import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import state from "../state";
import sound from "../sounds/mouse-click.mp3";
import { MathUtils } from "three";

export default function ArrowInfos({ showInfos, hideInfos, hideValue }) {
  const { camera, mouse } = useThree();
  // Récupérer la référence de la scène
  const sceneRef = useRef();

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  const [loaded, setLoaded] = useState(false);
  // Charger le modèle

  useEffect(() => {
    loader.load(
      "./models/arrow-infos.glb",
      (d) => {
        sceneRef.current.position.x = -0.7;
        sceneRef.current.position.y = 16;
        sceneRef.current.position.z = -2.7;
        sceneRef.current.rotation.z = -Math.PI / 1;

        sceneRef.current.add(d.scene);
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
        -0.7,
        1
      );
    }
  }, [showInfos]);
  useFrame(() => {
    if (hideValue) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        -5,
        0.1
      );
    }
  });

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
  const handleClick = (num) => {
    const position = {
      1: {
        cameraPos: [3.6, 0.28, -2.77],
        target: [0.15, 0.24, -2.77],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };

  return (
    <mesh
      onClick={(e) => {
        hideInfos(true);

        setStartSoundClick(true);
        handleClick(1);
      }}
      onPointerOver={(e) => {
        document.querySelector("canvas").style.cursor = "pointer";
        // e.stopPropagation();
      }}
      onPointerOut={(e) => {
        document.querySelector("canvas").style.cursor = "default";
        // e.stopPropagation();
      }}
      scale={5}
      ref={sceneRef}
    />
  );
}
