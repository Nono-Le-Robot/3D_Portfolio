import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";

export default function ArrowBack({ onGoBack }) {
  const { camera, mouse } = useThree();

  const [goBack, setGoBack] = useState(false);
  // Récupérer la référence de la scène
  const sceneRef = useRef();

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  const [loaded, setLoaded] = useState(false);
  // Charger le modèle

  useEffect(() => {
    loader.load(
      "./models/arrow.glb",
      (d) => {
        sceneRef.current.position.x = 9;
        sceneRef.current.position.y = 1.5;
        sceneRef.current.position.z = -14.3;
        sceneRef.current.add(d.scene);
        setLoaded(true);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);
  useFrame(() => {
    if (loaded) {
    }
  });
  const handleClick = () => {
    onGoBack(true);
  };

  return <mesh onClick={handleClick} scale={8} ref={sceneRef} />;
}
