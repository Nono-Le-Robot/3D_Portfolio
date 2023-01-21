import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Keyboard() {
  const model = useLoader(GLTFLoader, "./models/scene.glb");
  const keys = model.scene.children[14].children[0].children[0].children.filter(
    (res) => res.name.includes("key")
  );
  let keyPositions = {};
  keys.forEach((key) => {
    keyPositions[key.name] = key.position.y;
  });

  document.onkeydown = function (e) {
    e.preventDefault();

    keys.forEach((key) => {
      if (key.name === "key_" + e.key) {
        key.position.y = keyPositions[key.name] - 4;
      }
    });
  };

  document.onkeyup = function (e) {
    keys.forEach((key) => {
      if (key.name === "key_" + e.key) {
        key.position.y = keyPositions[key.name];
      }
    });
  };
}
