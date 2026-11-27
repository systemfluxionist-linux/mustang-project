import { OrbitControls, ContactShadows } from '@react-three/drei';

export function Scene({ children }) {
  return (
    <>
      <color attach="background" args={['#e9edf2']} />
      <hemisphereLight args={['#ffffff', '#aeb6c2', 0.85]} />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[6, 9, 6]}
        intensity={2.1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight position={[-7, 5, -4]} intensity={0.85} />
      <directionalLight position={[2, 3, -8]} intensity={0.55} />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#d8dee6" roughness={0.9} metalness={0.02} />
      </mesh>
      <ContactShadows position={[0, 0.01, 0]} opacity={0.34} scale={12} blur={2.4} far={4} resolution={512} color="#000000" />
      <OrbitControls
        makeDefault
        target={[0, 0.72, 0]}
        enableDamping
        dampingFactor={0.06}
        minDistance={4.5}
        maxDistance={16}
        maxPolarAngle={Math.PI / 2 - 0.04}
      />
      {children}
    </>
  );
}
