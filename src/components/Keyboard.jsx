import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import React, { useRef, useEffect } from "react";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

export default function MoveMouse() {
  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Récupérer la référence de la scène
  const sceneRef = useRef();

  // const keys = keyboard[0].children[0].children[0].children.filter((res) =>
  //   res.name.includes("key")
  // );

  // // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/desk/deskcompressed.glb",
      (d) => {
        sceneRef.current.add(d.scene);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);
  return <mesh ref={sceneRef} />;
}
