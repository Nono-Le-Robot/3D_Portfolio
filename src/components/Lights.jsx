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
      {/* <pointLight
        // castShadow

        intensity={0.7}
        position={[20, 13, -10]}
      ></pointLight>
      <pointLight
       
        intensity={0.7}
        position={[10, 13, 10]}
      ></pointLight>
      <pointLight
        // castShadow
        intensity={0.3}
        position={[1, 2.5, 0]}
      ></pointLight> */}
      <pointLight intensity={0.8} position={[1, 2.5, 0]} />
      <pointLight intensity={0.6} position={[3.2, 8.4, -2.6]} />
      <pointLight intensity={0.6} position={[43.6, 10.1, 0.0]} />
    </>
  );
}
