import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";

export default function BtnHobbies(props) {
  // Récupérer la référence de la scène
  const sceneRef = useRef(null);
  const [goCompetences, setGoCompetences] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [leaveBtn, setLeaveBtn] = useState(false);
  const { camera, mouse } = useThree();
  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/btn-hobbies.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        sceneRef.current.position.x = 0;
        sceneRef.current.position.y = -1.27;
        sceneRef.current.position.z = 2.2;
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);
  useFrame((state, delta) => {
    if (goCompetences) {
      camera.position.x = MathUtils.lerp(camera.position.x, 16, 0.025);
      camera.position.y = MathUtils.lerp(camera.position.y, 1, 0.025);
      camera.position.z = MathUtils.lerp(camera.position.z, 17, 0.025);
      camera.rotation.x = MathUtils.lerp(camera.rotation.x, 0.0, 0.025);
      camera.rotation.y = MathUtils.lerp(camera.rotation.y, 1.8, 0.025);
      camera.rotation.z = MathUtils.lerp(camera.rotation.z, 0, 0.025);
    }

    if (props.firstEnd) {
      if (!hoverBtn && !leaveBtn)
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.42,
          0.15
        );

      if (hoverBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.47,
          0.025
        );
      }
      if (leaveBtn) {
        sceneRef.current.position.x = MathUtils.lerp(
          sceneRef.current.position.x,
          0.42,
          0.025
        );
      }
    }
  });

  let scale = 0.12;
  return (
    <mesh
      position={[0.45, -1.2, -1.5]}
      rotation={[0, -1.57, 0]}
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoverBtn(true);
        setLeaveBtn(false);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setLeaveBtn(true);
        setHoverBtn(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setGoCompetences(true);
      }}
      ref={sceneRef}
    />
  );
}
