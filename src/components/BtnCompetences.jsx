import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import state from "../state";
import sound from "../sounds/mouse-click.mp3";

export default function BtnCompetences({ firstEnd }) {
  // Récupérer la référence de la scène
  const sceneRef = useRef(null);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [leaveBtn, setLeaveBtn] = useState(false);
  const { camera, mouse } = useThree();
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

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/btn-competences.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.position.x = 0;
        sceneRef.current.position.y = -0.62;
        sceneRef.current.position.z = -1;
        sceneRef.current.rotation.x = -Math.PI / 2;
        sceneRef.current.rotation.y = -Math.PI / 1.93;
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
        0.59,
        0.1
      );
      if (hoverBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.53,
          0.1
        );
      }
      if (leaveBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.59,
          0.1
        );
      }
    }
  });

  let scale = 0.12;
  const handleClick = (num) => {
    const position = {
      1: {
        cameraPos: [31.81, 2.72, -9.05],
        target: [31.77, 2.93, -16.92],
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
        setStartSoundClick(true);
        e.stopPropagation();
        handleClick(1);
      }}
      ref={sceneRef}
    />
  );
}
