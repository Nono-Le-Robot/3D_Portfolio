import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { act, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Camping() {
  // Récupérer la référence de la scène
  const sceneRef = useRef();
  let mixer;
  let action;
  let fire;

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/camping.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.receiveShadow = true;
          }
        });
        sceneRef.current.position.x = 4.5;
        sceneRef.current.position.y = -2.5;
        sceneRef.current.position.z = 8;
        sceneRef.current.rotation.y = -Math.PI / 1.2;
        const scaredAnimation = d.animations.filter((res) =>
          res.name.includes("scared")
        );

        const fireAnimation = d.animations.filter((res) =>
          res.name.includes("Fire_Fire_0Action.001")
        );

        mixer = new THREE.AnimationMixer(d.scene);
        action = mixer.clipAction(scaredAnimation[0]);
        fire = mixer.clipAction(fireAnimation[0]);
        action.repetitions = 1;
        action.time = 20;
        fire.play();
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  const handleClickAnimation = () => {
    action.reset();
    action.time = 0.5;
    action.timeScale = 1.5;
    action.play();
  };

  return (
    <mesh
      onClick={() => handleClickAnimation()}
      onPointerOver={(e) => {
        document.querySelector("canvas").style.cursor = "pointer";
      }}
      onPointerOut={(e) => {
        document.querySelector("canvas").style.cursor = "default";
      }}
      scale={0.025}
      ref={sceneRef}
    />
  );
}
