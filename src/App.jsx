import { Canvas, extend, useThree } from "@react-three/fiber";
import Desk from "./components/Desk";
import React, { useState, useEffect, useRef, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as THREE from "three";
import {
  HueSaturation,
  EffectComposer,
  BrightnessContrast,
  DepthOfField,
  SMAA,
  SSAO,
  Bloom,
  LUT,
  Vignette,
} from "@react-three/postprocessing";
import Loader from "./components/Loader";
import Lights from "./components/Lights";
import Guitar from "./components/Guitar";
import Rl from "./components/Rl";
import Printer from "./components/Printer";
import Plant from "./components/Plant";
import Drone from "./components/Drone";
import Stack from "./components/Stack";
import CameraControls from "./components/CameraControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Vr from "./components/Vr";
import Camping from "./components/Camping";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import LightHelper from "./components/LightHelper";
import sound from "./sounds/mouse-click.mp3";
import backLogo from "./img/back.png";
import state from "./state";
import fullscreenIcon from "./img/fullscreen.png";
import skipIcon from "./img/skip.png";
extend({ OrbitControls });

export default function App() {
  const [startSoundClick, setStartSoundClick] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);

  useEffect(() => {
    if (startSoundClick) {
      playSoundClick();
      setStartSoundClick(false);
    }
  }, [startSoundClick]);

  function playSoundClick() {
    new Audio(sound).play();
  }

  function enterFullScreen(element) {
    setFullscreen(!fullscreen);
    if (fullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen(); // Firefox
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Safari
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    } else {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }
    }
  }

  const handleClick = (num) => {
    const position = {
      1: {
        cameraPos: [4.21, 7.05, -3.13],
        target: [4.21, 9.23, -3.13],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };
  const fullScreenBtn = document.querySelector("#fullscreen-btn");
  const myDocument = document.documentElement;
  const Orbit = () => {
    const { camera, gl } = useThree();
    return (
      <orbitControls
        attach="orbitControls"
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
        args={[camera, gl.domElement]}
      />
    );
  };

  return (
    <>
      <BrowserRouter>
        <div id="more-infos">
          <div id="body-infos">
            <h2>
              J'ai d??couvert la programmation informatique ?? l'??ge de 12 ans en
              apprenant le langage C et le HTML/CSS. Cette exp??rience m'a donn??
              envie de continuer ?? explorer le d??veloppement informatique.
            </h2>
            <h2>
              Vers mes 16 ans, j'ai entrepris la cr??ation de serveurs de jeux
              vid??o priv??s, ce qui m'a permis de d??couvrir d'autres technologies
              telles que PHP, PHPmyAdmin, MySQL, JS et Lua. J'ai ??galement
              appris ?? g??rer des serveurs et des bases de donn??es, ainsi qu'??
              acqu??rir des comp??tences en administration de r??seaux. Ces
              connaissances m'ont ??t?? utiles pour comprendre les impacts et les
              contraintes li??s ?? la production en tant que d??veloppeur web.
            </h2>
            <h2>
              J'ai eu besoin de la programmation ?? diff??rents moments, comme par
              exemple pour faire de la domotique ?? l'aide d'une imprimante 3D et
              d'un Raspberry Pi, en r??alisant un bot de trading, ou en r??alisant
              des petits projets Arduino.
            </h2>
            <h2>
              C'est seulement ?? l'??ge de 28 ans que j'ai r??alis?? que je devais
              faire de cette passion une carri??re professionnelle, j'ai donc
              entrepris une formation de d??veloppeur web pour confirmer mes
              comp??tences et faire mes premiers pas dans le d??veloppement
              professionnel.
            </h2>
          </div>
          <div>
            <img
              onClick={() => {
                handleClick(1);
                setTimeout(() => {
                  document.getElementById("more-infos").style.display = "none";
                }, 100);
              }}
              id="back-infos"
              alt=""
              srcset={backLogo}
            />
          </div>
        </div>
        <Loader />
        <img
          onClick={(e) => {
            enterFullScreen(myDocument);
          }}
          id="fullscreen-btn"
          alt=""
          srcset={fullscreenIcon}
        />

        <div>
          <img id="skip-intro" alt="" srcset={skipIcon} />
        </div>
        <Canvas>
          <Orbit />
          {/* <OrbitControls enableDamping={false} /> */}
          <CameraControls />
          {/* <Camera position={[6, -1, 3]} rotation={[0, 1, 0]} /> */}
          <Lights />
          {/* <LightHelper /> */}

          <EffectComposer multisampling={4} disableNormalPass={true}>
            {/* <DepthOfField
              focusDistance={0}
              focalLength={0.02}
              bokehScale={2}
              height={460}
            /> */}

            {/* <LUT /> */}

            <HueSaturation saturation={0.05} />
            <BrightnessContrast contrast={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={0.7} />
          </EffectComposer>
          <Suspense fallback={<Loader />}>
            <Desk />
            <Stack />
            <Guitar />
            <Rl />
            <Printer />
            <Plant />
            <Drone />
            <Vr />
            <Camping />
          </Suspense>
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Canvas>
      </BrowserRouter>
    </>
  );
}
