import React, { useState, useEffect, useRef, Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";
import { useFrame } from "react-three-fiber";

export default function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        document.querySelector("#loader-test").style.display = "none";
      }, 1000);
    }
  }, [progress]);

  return (
    <div id="loader-test">
      <h1> {progress.toFixed(0)} % loaded</h1>
    </div>
  );
}
