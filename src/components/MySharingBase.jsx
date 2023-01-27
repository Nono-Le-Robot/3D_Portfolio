import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";

export default function MySharingBase() {
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
      "./models/my-sharing-base.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        sceneRef.current.position.y = 3;
        sceneRef.current.position.x = 45;
        sceneRef.current.position.z = 26.5;

        sceneRef.current.rotation.x = 0;
        sceneRef.current.rotation.y = Math.PI / 2;
        sceneRef.current.rotation.z = -Math.PI / 2;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  return (
    <mesh
      onPointerOver={(e) => {
        document.querySelector("canvas").style.cursor = "pointer";
        // e.stopPropagation();
      }}
      onPointerOut={(e) => {
        document.querySelector("canvas").style.cursor = "default";
        // e.stopPropagation();
      }}
      onClick={() => {
        window.open("https://sannier-renaud.fr/my-sharing-base", "_blank");
      }}
      scale={1.5}
      ref={sceneRef}
    />
  );
}
