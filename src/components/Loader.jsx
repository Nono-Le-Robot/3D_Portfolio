import React, { useState, useEffect, useRef, Suspense } from "react";
import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div id="load-model">{progress.toFixed(0)} % loaded</div>
    </Html>
  );
}
