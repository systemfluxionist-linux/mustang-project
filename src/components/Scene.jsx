import { OrbitControls } from '@react-three/drei';

export function Scene({ children }) {
  return (
    <>
      {/* Studio lighting: ambient + key + fill + rim */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[7, 10, 8]} intensity={2.0} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.7} />
      <directionalLight position={[5, 5, -8]} intensity={0.5} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} dampingEnable={true} dampingFactor={0.1} minPolarAngle={0} maxPolarAngle={Math.PI / 2 - 0.1} />
      {children}
    </>
  );
}