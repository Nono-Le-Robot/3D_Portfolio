import React, { useRef, useEffect, useState, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import keyboardjs from "keyboardjs";
import Screen from "./Screen";
import MySharingBase from "./MySharingBase";
import Tuner from "./Tuner";
import JsAssist from "./JsAssis";
import Groupomania from "./Groupomania";
import ArrowBack2 from "./ArrowBack2";

export default function Desk() {
  // Récupérer la référence de la scène

  const sceneRef = useRef(null);
  const { camera, mouse } = useThree();
  const [loaded, setLoaded] = useState(false);

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/deskcompressed.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        setLoaded(true);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  useFrame((state) => {
    if (loaded) {
      const mouseModel = sceneRef.current.children[0].children.filter(
        (res) => res.name === "mouse"
      );
      mouseModel[0].position.x = -mouse.y / 1.5 + 3.5;
      mouseModel[0].position.z = -mouse.x / 1.5 - 6;
    }
  });

  // useEffect(() => {
  //   if (loaded) {
  //     const keyboard = sceneRef.current.children[0].children.filter(
  //       (res) => res.name === "keyboard"
  //     );

  //     const keys = keyboard[0].children[0].children[0].children.filter((res) =>
  //       res.name.includes("key")
  //     );
  //     let keyPositions = {};
  //     keys.forEach((key) => {
  //       keyPositions[key.name] = key.position.y;
  //     });

  //     document.onkeydown = function (e) {
  //       // e.preventDefault();

  //       keys.forEach((key) => {
  //         if (key.name === "key_" + e.key) {
  //           key.position.y = keyPositions[key.name] - 4;
  //         }
  //       });
  //     };

  //     document.onkeyup = function (e) {
  //       keys.forEach((key) => {
  //         if (key.name === "key_" + e.key) {
  //           key.position.y = keyPositions[key.name];
  //         }
  //       });
  //     };
  //   }
  // }, [loaded]);

  // //move keyboard

  // render
  return (
    <>
      <Screen />
      <MySharingBase />
      <Tuner />
      <JsAssist />
      <Groupomania />
      <ArrowBack2 />
      <mesh ref={sceneRef} />;
    </>
  );
}
