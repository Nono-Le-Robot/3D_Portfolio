export default function Lights() {
  return (
    <>
      {/* <pointLight
        shadow-mapSize-height={1920}
        shadow-mapSize-width={1920}
        castShadow
        intensity={1}
        position={[20, 13.7, 15]}
      ></pointLight> */}

      {/* <ambientLight intensity={2} color={0xffddff} /> */}
      <pointLight
        // castShadow

        intensity={0.7}
        position={[20, 13, -10]}
      ></pointLight>
      <pointLight
        castShadow
        shadow-mapSize-height={4000}
        shadow-mapSize-width={4000}
        intensity={0.7}
        position={[10, 13, 10]}
      ></pointLight>
      <pointLight
        // castShadow
        intensity={0.3}
        position={[1, 2.5, 0]}
      ></pointLight>
    </>
  );
}
