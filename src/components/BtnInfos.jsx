import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import sound from "../sounds/mouse-click.mp3";
import state from "../state.js";
import Infos from "./Infos";
import ArrowInfos from "./ArrowInfos";
import ArrowMoreInfos from "./ArrowMoreInfos";
import MoreInfos from "./MoreInfos";
import ArrowBackMoreInfos from "./ArrowBackMoreInfos";

export default function BtnInfos({ firstEnd }) {
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
  const [goCompetences, setGoCompetences] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [leaveBtn, setLeaveBtn] = useState(false);
  const [showInfos, setShowInfos] = useState(false);
  const [hideInfos, setHideInfos] = useState(true);
  const { camera, mouse } = useThree();

  useEffect(() => {
    if (hideInfos) {
      setTimeout(() => {
        setShowInfos(false);
      }, 200);
    }
  }, [hideInfos]);

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/btn-infos.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.position.x = -1;
        sceneRef.current.position.y = -1.7;
        sceneRef.current.position.z = -3.5;
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
        0.3,
        0.1
      );
      if (hoverBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.26,
          0.1
        );
      }
      if (leaveBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.29,
          0.1
        );
      }
    }
  });

  const handleClick = (num) => {
    const position = {
      1: {
        cameraPos: [4.21, 7.05, -3.13],
        target: [4.21, 9.23, -3.13],
      },
    };

    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };
  let scale = 0.12;

  return (
    <>
      <group>
        <Infos hideValue={hideInfos} showInfos={showInfos} />
        {/* <MoreInfos hideValue={hideInfos} showInfos={showInfos} /> */}
        <ArrowInfos
          hideValue={hideInfos}
          hideInfos={setHideInfos}
          showInfos={showInfos}
        />
        {/* <ArrowBackMoreInfos
          hideValue={hideInfos}
          hideInfos={setHideInfos}
          showInfos={showInfos}
        />
        <ArrowMoreInfos
          hideValue={hideInfos}
          hideInfos={setHideInfos}
          showInfos={showInfos}
        /> */}
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
            handleClick(1);
            setStartSoundClick(true);
            setShowInfos(true);
            setHideInfos(false);
          }}
          ref={sceneRef}
        />
      </group>
    </>
  );
}
