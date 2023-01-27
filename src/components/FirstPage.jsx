import React, { useRef, useEffect, useState, Suspense } from "react";
import url from "../videos/first.mp4";
import * as THREE from "three";
import state from "../state";
import sound from "../sounds/mouse-click.mp3";
export default function FirstPage({ onFirstEnd }) {
  const skipBtn = document.getElementById("skip-intro");
  const audio = new Audio(sound);
  const [startSoundClick, setStartSoundClick] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  useEffect(() => {
    if (startSoundClick) {
      playSoundClick();
      setStartSoundClick(false);
    }
  }, [startSoundClick]);

  function playSoundClick() {
    audio.volume = 1;
    audio.play();
  }
  // Récupérer la référence de la scène
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const [skipButton, setSkipButton] = useState(false);
  const [startScene, setStartScene] = useState(false);
  const [ready, setReady] = useState(false);
  const [firstEnd, setFirstEnd] = useState(false);
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = false;
    vid.muted = true;
    vid.addEventListener("loadedmetadata", () => {
      setVideoLoaded(true);
      if (startScene) {
        skipBtn.style.display = "block";
      }
    });
    vid.addEventListener("ended", myHandler, false);
    function myHandler(e) {
      setFirstEnd(true);
      skipBtn.style.display = "none";
      onFirstEnd(true);
    }
    return vid;
  });

  const handleClick = (num) => {
    setReady(true);
    const position = {
      1: {
        cameraPos: [3.46, 0.19, -2.77],
        target: [0.15, 0.2, -2.77],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };

  return (
    <>
      <mesh
        rotation={[Math.PI / 2, 1.58, -Math.PI / 2]}
        position={[0.3, 0.25, -2.65]}
        scale={[7.7, 4.45, 2.2]}
        onClick={(e) => {
          if (!startScene) {
            video.play();
            if (videoLoaded) {
              skipBtn.style.display = "block";
              skipBtn.addEventListener("click", () => {
                video.currentTime = video.duration;
                skipBtn.style.display = "none";
              });
            }
          }
          setStartScene(true);

          e.stopPropagation();
          if (!startSoundClick) {
            setStartSoundClick(true);
          }
          handleClick(1);
        }}
        onPointerOver={(e) => {
          document.querySelector("canvas").style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          document.querySelector("canvas").style.cursor = "default";
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
