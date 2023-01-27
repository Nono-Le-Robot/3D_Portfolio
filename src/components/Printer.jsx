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
      "./models/3dprintercompressed.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.receiveShadow = true;
          }
        });
        sceneRef.current.position.x = 0;
        sceneRef.current.position.y = -2.7;
        sceneRef.current.position.z = 15.2;
        sceneRef.current.rotation.y = Math.PI / 2;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  return <mesh scale={0.5} ref={sceneRef} />;
}
