import { useFrame } from "react-three-fiber";
import state from "../state";
import * as THREE from "three";
const CameraControls = ({}) => {
  useFrame(({ camera, scene }) => {
    // console.log(camera.position);
    // console.log(scene.orbitControls.target);
    if (state.shouldUpdate) {
      camera.position.lerp(state.cameraPos, 0.1);
      scene.orbitControls.target.lerp(state.target, 0.1);
      scene.orbitControls.update();

      const diff = camera.position.clone().sub(state.cameraPos).length();
      if (diff < 0.1) state.shouldUpdate = false;
    }
  });
  return null;
};

export default CameraControls;
