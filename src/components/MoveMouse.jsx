import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

export default function MoveMouse() {
  // Récupérer la référence de la scène
  const sceneRef = useRef();
  const { camera, mouse } = useThree();

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
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

  useFrame((state) => {
    const mouseModel = sceneRef.current.children[0].children.filter(
      (res) => res.name === "mouse"
    );
    mouseModel[0].position.x = -mouse.y / 1.5 + 3.5;
    mouseModel[0].position.z = -mouse.x / 1.5 - 4;
  });

  return <mesh ref={sceneRef} />;
}
