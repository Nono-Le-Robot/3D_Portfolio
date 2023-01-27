import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";

export default function Vr() {
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
      "./models/vr.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        sceneRef.current.position.x = 1.7;
        sceneRef.current.position.y = -0.55;
        sceneRef.current.position.z = 13.5;
        sceneRef.current.rotation.y = Math.PI / 1.7;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  return <mesh scale={2.9} ref={sceneRef} />;
}
