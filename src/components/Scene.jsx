import { OrbitControls } from '@react-three/drei';

export function Scene({ children }) {
  return (
    <>
      <color attach="background" args={['#161a20']} />
      <hemisphereLight args={['#dce8ff', '#242018', 0.75]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 5]} intensity={2.2} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-6, 5, -4]} intensity={0.9} />
      <directionalLight position={[2, 4, -8]} intensity={0.6} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#20242b" roughness={1} />
      </mesh>
      <OrbitControls
        makeDefault
        target={[0, 0.7, 0]}
        enableDamping
        dampingFactor={0.08}
        minDistance={4}
        maxDistance={20}
        maxPolarAngle={Math.PI / 2 - 0.05}
      />
      {children}
    </>
  );
}
