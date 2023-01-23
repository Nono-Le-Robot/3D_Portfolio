export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.01} color={0xffddff} />
      <pointLight
        castShadow
        intensity={0.7}
        position={[10, 13, -10]}
      ></pointLight>
      <pointLight
        castShadow
        intensity={0.5}
        position={[10, 13, 10]}
      ></pointLight>
      <pointLight
        castShadow
        intensity={0.8}
        position={[1, 2.5, 0]}
      ></pointLight>
    </>
  );
}
