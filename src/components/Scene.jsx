import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { LoopOnce } from "three";

export default function Scene() {
  const model = useLoader(GLTFLoader, "./models/scene.glb");

  model.scene.children.forEach((mesh, i) => {
    mesh.castShadow = true;
  });
  model.castShadow = true;
  model.scene.castShadow = true;

  let mixer;
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);
    // const action = mixer.clipAction(model.animations[2]);
    // action.play();
    model.animations.forEach((clip) => {
      const animation = mixer.clipAction(clip);
      // animation.setLoop(THREE.LoopOnce);
      animation.clampWhenFinished = true;
      animation.play();
    });
  }

  useFrame((scene, delta) => {
    mixer?.update(delta);
  });

  return <primitive object={model.scene} />;
}
