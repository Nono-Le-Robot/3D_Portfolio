import React, { useRef, useEffect, useState, Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { useThree } from "@react-three/fiber";
import url from "../videos/first.mp4";
import * as THREE from "three";

export default function FirstPage({ onFirstEnd, goBack }) {
  // Récupérer la référence de la scène
  useEffect(() => {
    console.log(goBack);
  }, [goBack]);

  const sceneRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [yPos, setYPos] = useState(0);
  const [ySpeed, setYSpeed] = useState(0.02);
  const [ready, setReady] = useState(false);
  const { camera, mouse } = useThree();
  const [firstEnd, setFirstEnd] = useState(false);
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = false;
    vid.muted = true;
    vid.addEventListener("ended", myHandler, false);
    function myHandler(e) {
      setFirstEnd(true);
      onFirstEnd(true);
    }
    return vid;
  });
  // Initialiser les chargeurs
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);

  // Charger le modèle
  useEffect(() => {
    loader.load(
      "./models/firstpage.glb",
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
      if (!goBack) {
        camera.position.x = MathUtils.lerp(camera.position.x, 3, 0.025);
        camera.position.y = MathUtils.lerp(camera.position.y, 0, 0.025);
        camera.position.z = MathUtils.lerp(camera.position.z, 0.2, 0.025);
        camera.rotation.y = MathUtils.lerp(camera.rotation.y, 1.57, 0.025);
        camera.rotation.z = MathUtils.lerp(camera.rotation.z, 0.0, 0.025);
      } else {
        camera.position.x = MathUtils.lerp(camera.position.x, 48, 0.025);
        camera.position.y = MathUtils.lerp(camera.position.y, 9, 0.025);
        camera.position.z = MathUtils.lerp(camera.position.z, 0, 0.025);
        camera.rotation.y = MathUtils.lerp(camera.rotation.y, -1.5, 0.025);
        camera.rotation.x = MathUtils.lerp(camera.rotation.x, -0.1, 0.025);
        camera.rotation.z = MathUtils.lerp(camera.rotation.z, 0, 0.025);
      }
    }
  });

  useEffect(() => {
    if (loaded) {
      sceneRef.current.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = new THREE.VideoTexture(video);
        }
      });
    }
  }, [loaded]);

  return (
    <>
      <mesh
        rotation={[Math.PI / 2, 1.64, -Math.PI / 2]}
        position={[0.5, 0.1, 0.1]}
        scale={[6.4, 3.45, 1]}
        onClick={() => {
          startDemo();
          setTimeout(() => {
            video.play();
          }, 1000);
        }}
      >
        <planeGeometry />
        <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </>
  );
}
