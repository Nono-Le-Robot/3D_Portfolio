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
      "./models/gamecube.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        sceneRef.current.position.x = 1.3;
        sceneRef.current.position.y = -2.3;
        sceneRef.current.position.z = 6.3;
        sceneRef.current.rotation.y = Math.PI / 2.5;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  return <mesh castShadow scale={0.035} ref={sceneRef} />;
}
