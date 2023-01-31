import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import state from "../state.js";
import ArrowInfos from "./ArrowInfos.jsx";
import Plus from "./Plus.jsx";
export default function Infos({ showInfos, hideValue }) {
  const sceneRef = useRef();
  const { camera, mouse } = useThree();
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./gltf/");
  loader.setDRACOLoader(dracoLoader);
  const [loaded, setLoaded] = useState(false);

  const [gmailHovered, setGmailHovered] = useState(false);
  const [gitHubHovered, setGitHubHovered] = useState(false);
  const [linkedinHovered, setLinkedinHovered] = useState(false);
  const [cvHovered, setCvHovered] = useState(false);

  useEffect(() => {
    loader.load(
      "./models/infos.glb",
      (d) => {
        // console.log(d);
        sceneRef.current.add(d.scene);

        sceneRef.current.traverse(function (node) {
          if (node.isMesh) {
            node.castShadow = true;
          }
        });
        sceneRef.current.position.x = -8;
        sceneRef.current.position.y = 16.15;
        sceneRef.current.position.z = -3;
        sceneRef.current.rotation.z = -Math.PI / 2;
        sceneRef.current.rotation.y = Math.PI / 0.24998;
        setLoaded(true);
      },
      null,
      (e) => {
        console.error(e);
      }
    );
  }, []);
  useEffect(() => {
    if (showInfos) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        0,
        1
      );
    }
  }, [showInfos]);
  useFrame(() => {
    if (hideValue) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        -15,
        1
      );
    }
  });
  const handleClick = (num) => {
    const position = {
      1: {
        cameraPos: [3.18, 8.85, 8.74],
        target: [-1.26, 8.81, 8.72],
      },
      2: {
        cameraPos: [4.85, 8.9, -0.1],
        target: [-1.24, 8.84, -0.12],
      },
    };
    state.cameraPos.set(...position[num].cameraPos);
    state.target.set(...position[num].target);
    state.shouldUpdate = true;
  };

  useFrame(() => {
    if (showInfos) {
      sceneRef.current.position.x = MathUtils.lerp(
        sceneRef.current.position.x,
        -0.2,
        1
      );
    }

    // Detect mouseover on gmail mesh
    if (loaded) {
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        sceneRef.current.children[0].children
      );
      if (intersects.length > 0) {
        // console.log(intersects);
        for (let index = 0; index < intersects.length; index++) {
          if (intersects[index].object.name.includes("gmail")) {
            setGmailHovered(true);
          } else {
            setGmailHovered(false);
          }

          if (intersects[index].object.name.includes("github")) {
            setGitHubHovered(true);
          } else {
            setGitHubHovered(false);
          }

          if (intersects[index].object.name.includes("linkedIn")) {
            setLinkedinHovered(true);
          } else {
            setLinkedinHovered(false);
          }

          if (intersects[index].object.name.includes("cv")) {
            setCvHovered(true);
          } else {
            setCvHovered(false);
          }
        }
      } else {
        setGmailHovered(false);
        setCvHovered(false);
        setGitHubHovered(false);
        setLinkedinHovered(false);
      }
    }
  });

  useEffect(() => {
    if (gmailHovered || linkedinHovered || gitHubHovered || cvHovered) {
      document.querySelector("canvas").style.cursor = "pointer";
    } else {
      document.querySelector("canvas").style.cursor = "default";
    }
  }, [gmailHovered, linkedinHovered, gitHubHovered, cvHovered]);

  return (
    <group>
      <Plus />
      <mesh
        onClick={() => {
          if (gmailHovered) {
            window.open(
              "mailto:" +
                "sannier.renaud@gmail.com" +
                "?cc=" +
                "" +
                "&subject=" +
                "Contact Portfolio"
            );
          }

          if (gitHubHovered) {
            window.open("https://github.com/Nono-Le-Robot", "_blank");
          }

          if (linkedinHovered) {
            window.open(
              "https://www.linkedin.com/in/renaud-sannier/",
              "_blank"
            );
          }

          if (cvHovered) {
            window.open(
              "https://sannier-renaud.fr/standard-portfolio/files/CV_Renaud_Sannier.pdf",
              "_blank"
            );
          }
        }}
        scale={1.5}
        ref={sceneRef}
      />
      ;
    </group>
  );
}
