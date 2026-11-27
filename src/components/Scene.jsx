import { OrbitControls } from '@react-three/drei';

export function Scene({ children }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -7]} intensity={0.5} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={0x222222} />
      </mesh>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      {children}
    </>
  );
}