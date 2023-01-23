import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import url from "../videos/second.mp4";
import * as THREE from "three";

export default function SecondPage() {
  // Récupérer la référence de la scène
  const sceneRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [yPos, setYPos] = useState(0);
  const [ySpeed, setYSpeed] = useState(0.02);
  const [ready, setReady] = useState(false);
  const { camera, mouse } = useThree();

  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/firstpagetest.glb",
      (d) => {
        sceneRef.current.add(d.scene);
        setLoaded(true);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);

  const startDemo = () => {
    setReady(true);
  };
  useFrame((state, delta) => {
    if (ready) {
      camera.position.x = MathUtils.lerp(camera.position.x, 3, 0.025);
      camera.position.y = MathUtils.lerp(camera.position.y, 0, 0.025);
      camera.position.z = MathUtils.lerp(camera.position.z, 0.2, 0.025);
      camera.rotation.y = MathUtils.lerp(camera.rotation.y, 1.57, 0.025);
      camera.rotation.z = MathUtils.lerp(camera.rotation.z, 0.0, 0.025);

      //   camera.position.x = MathUtils.lerp(camera.position.x, 26, 0.025);
      //   camera.position.y = MathUtils.lerp(camera.position.y, 4, 0.025);
      //   camera.position.z = MathUtils.lerp(camera.position.z, 0.2, 0.025);

      //   camera.rotation.y = MathUtils.lerp(camera.rotation.y, 0, 0.025);
      //   camera.rotation.x = MathUtils.lerp(camera.rotation.x, -0.1, 0.025);
      // }
    }
  });

  const [first] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = false;
    vid.muted = true;
    return vid;
  });
  useEffect(() => {
    sceneRef.current.traverse(function (child) {
      if (child.isMesh) {
        child.material.map = new THREE.VideoTexture(first);
      }
    });
  }, [loaded]);

  return (
    <mesh
      onClick={() => {
        startDemo();
        setTimeout(() => {
          first.play();
        }, 1000);
      }}
      ref={sceneRef}
    ></mesh>
  );
}
