import * as THREE from "three";

const state = {
  activeMesh: null,
  cameraPos: new THREE.Vector3(7, -1, 3),
  target: new THREE.Vector3(0, -1, -1.5),
  shouldUpdate: true,
};
export default state;
