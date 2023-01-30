import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import ArrowBack from "../components/ArrowBack";
import ArrowMoreCompetences from "./ArrowMoreCompetences";
import ArrowBackMoreCompetences from "./ArrowBackMoreCompetences";

export default function MoreCompetences() {
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
      "./models/more-competences.glb",
      (d) => {
        sceneRef.current.position.x = 60;
        sceneRef.current.position.y = -4;
        sceneRef.current.position.z = -22.2;
        sceneRef.current.add(d.scene);
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        setLoaded(true);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  return (
    <group>
      <ArrowBackMoreCompetences />
      <mesh scale={1.2} ref={sceneRef} />;
    </group>
  );
}
