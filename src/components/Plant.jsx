import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";

export default function Guitar() {
  // Récupérer la référence de la scène
  const sceneRef = useRef();

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/plant/plantcompressed.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.children[0].position.z = 1;
        sceneRef.current.children[0].position.x = 0;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  return <mesh ref={sceneRef} />;
}
