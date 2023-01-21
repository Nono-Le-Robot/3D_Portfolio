import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";

export default function Camera(props) {
  const { camera, mouse } = useThree();
  const model = useLoader(GLTFLoader, "./models/scene.glb");
  const vec = new Vector3();
  let x = props.position[0];
  let y = props.position[1];
  let z = props.position[2];
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
  useFrame((state) => {
    // state.camera.position.lerp(vec.set(4, 0, 0), 0.005);
  });
}
