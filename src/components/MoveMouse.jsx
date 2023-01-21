import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";

export default function MoveMouse() {
  const model = useLoader(GLTFLoader, "./models/scene.glb");
  const { camera, mouse } = useThree();
  const helices = model.scene.children
    .filter((res) => res.name === "drone")[0]
    .children[0].children[0].children.filter((res) =>
      res.name.includes("helice")
    );
  useFrame((state) => {
    for (let index = 0; index < helices.length; index++) {
      helices[index].rotation.y -= 0.9;
    }
    // state.camera.position.lerp(vec.set(4, 0, 0), 0.005);
    const mouseModel = model.scene.children.filter((res) =>
      res.name.includes("mouse")
    );

    mouseModel[0].position.x = -mouse.y / 1.5 + 3.5;
    mouseModel[0].position.z = -mouse.x / 1.5 - 4;
  });
}
