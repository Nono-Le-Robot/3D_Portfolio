import React, { useRef, useEffect, useState, Suspense } from "react";
import url from "../videos/first.mp4";
import * as THREE from "three";
import state from "../state";
import sound from "../sounds/mouse-click.mp3";

export default function FirstPage({ onFirstEnd }) {
  const [startSoundClick, setStartSoundClick] = useState(false);
  useEffect(() => {
    if (startSoundClick) {
      playSoundClick();
      setStartSoundClick(false);
    }
  }, [startSoundClick]);

  function playSoundClick() {
    new Audio(sound).play();
  }
  // Récupérer la référence de la scène
  const sceneRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);

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

  useEffect(() => {
    if (loaded) {
      sceneRef.current.traverse(function (child) {
        if (child.isMesh) {
          child.material.map = new THREE.VideoTexture(video);
        }
      });
    }
  }, [loaded]);

  const handleClick = (num) => {
    setReady(true);
    const position = {
      1: {
        cameraPos: [3, 0.5, 0],
        target: [0, 0.1, 0],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
    if (!firstEnd) {
      setTimeout(() => {
        video.play();
      }, 1000);
    }
  };

  return (
    <>
      <mesh
        rotation={[Math.PI / 2, 1.64, -Math.PI / 2]}
        position={[0.5, 0.1, 0.1]}
        scale={[6.4, 3.45, 1]}
        onClick={(e) => {
          if (!startSoundClick) {
            setStartSoundClick(true);
          }
          e.stopPropagation();
          handleClick(1);
        }}
      >
        <planeGeometry />
        <meshStandardMaterial
          emissive={"white"}
          emissiveIntensity={0}
          side={THREE.DoubleSide}
        >
          <videoTexture attach="map" args={[video]} />
          <videoTexture args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </>
  );
}
