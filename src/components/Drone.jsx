import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
export default function Guitar() {
  // Récupérer la référence de la scène
  const sceneRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [yPos, setYPos] = useState(0);
  const [ySpeed, setYSpeed] = useState(0.02);
  const { camera, mouse } = useThree();
  const [controlDrone, setControlDrone] = useState(false);

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/drone/dronecompressed.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.position.x = 4;
        sceneRef.current.position.y = 1;
        sceneRef.current.position.z = 8;
        sceneRef.current.rotation.x = 0;
        sceneRef.current.rotation.y = -0.2;
        sceneRef.current.rotation.z = -0.1;
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
      // animation de haut en bas de l'axe y
      if (controlDrone) {
        setYPos(yPos + ySpeed);
        sceneRef.current.position.y = MathUtils.lerp(
          sceneRef.current.position.y,
          mouse.y * 2,
          0.05
        );
        sceneRef.current.rotation.z = MathUtils.lerp(
          sceneRef.current.rotation.z,
          -mouse.y / 4,
          0.05
        );
        sceneRef.current.position.z = MathUtils.lerp(
          sceneRef.current.position.z,
          (sceneRef.current.position.z = -mouse.x * 6.5 + 11.8),
          0.05
        );
        sceneRef.current.rotation.y = MathUtils.lerp(
          sceneRef.current.rotation.y,
          (sceneRef.current.rotation.y = -mouse.x),
          0.05
        );
        sceneRef.current.rotation.x = MathUtils.lerp(
          sceneRef.current.rotation.x,
          (sceneRef.current.rotation.x = -mouse.x),
          0.05
        );
        camera.position.y = MathUtils.lerp(
          camera.position.y - 0.05,
          mouse.y,
          0.05
        );
        camera.position.z = MathUtils.lerp(
          camera.position.z + 0.6,
          -mouse.x,
          0.05
        );

        camera.position.x = MathUtils.lerp(camera.position.x, 7, 0.05);
      }

      // Math.sin(yPos) * 0.04 + 0.5;

      // rotation des hélices
      const helices =
        sceneRef.current.children[0].children[0].children[0].children[0].children.filter(
          (res) => res.name.includes("helice")
        );

      helices.forEach((helice) => {
        helice.rotation.y += 1;
      });
    }
  });

  return (
    <mesh
      onClick={() => {
        setControlDrone(!controlDrone);
      }}
      ref={sceneRef}
    />
  );
}
