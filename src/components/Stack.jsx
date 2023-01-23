import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import ArrowBack from "../components/ArrowBack";

export default function Stack({ onGoBack }) {
  // camera position to scene : 22 7.7 2.2

  // Récupérer la référence de la scène
  const sceneRef = useRef();
  const [goBack, setGoBack] = useState(false);
  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  const [loaded, setLoaded] = useState(false);
  // Charger le modèle

  useEffect(() => {
    loader.load(
      "./models/stack.glb",
      (d) => {
        sceneRef.current.position.x = 25.5;
        sceneRef.current.position.y = -4.5;
        sceneRef.current.position.z = -13.02;
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
      const icons = sceneRef.current.children[0].children.filter(
        (res) => res.name !== "Cube"
      );
      icons.forEach((icon) => {
        if (icon.name === "js") icon.rotation.y += 0.02;
        if (icon.name === "nodejs") icon.rotation.z += 0.02;
        if (icon.name === "react") icon.rotation.y -= 0.02;
        if (icon.name === "html") icon.rotation.y += 0.02;
        if (icon.name === "css") icon.rotation.y += 0.02;
      });
    }
  });
  const handleGoBack = (data) => {
    setGoBack(data);
    onGoBack(data);
  };

  return (
    <group>
      <mesh ref={sceneRef} />;
      <ArrowBack onGoBack={handleGoBack} />
    </group>
  );
}
