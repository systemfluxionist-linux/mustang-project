import { useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Mustang = () => {
  const bodyGeo = useMemo(() => new THREE.BoxGeometry(4.2, 1.4, 1.9), []);
  const hoodGeo = useMemo(() => new THREE.BoxGeometry(2.2, 1.1, 1.85), []);
  const cabinGeo = useMemo(() => new THREE.BoxGeometry(1.6, 1.2, 1.6), []);
  const grilleGeo = useMemo(() => new THREE.PlaneGeometry(1.6, 0.6), []);
  const wheelGeo = useMemo(() => new THREE.CylinderGeometry(0.45, 0.45, 0.3, 24), []);
  const tireGeo = useMemo(() => new THREE.CylinderGeometry(0.5, 0.5, 0.35, 24), []);

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 0.4, metalness: 0.3 }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7 }), []);
  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.1, metalness: 0.9 }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x2a3a4a, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.6 }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.9 }), []);

  const wheelPositions = [
    [-1.6, -0.55, 1.1], [1.6, -0.55, 1.1],
    [-1.6, -0.55, -1.1], [1.6, -0.55, -1.1],
  ];

  return (
    <group>
      <mesh geometry={bodyGeo} material={bodyMat} position={[0, 0.3, -0.15]} castShadow receiveShadow />
      <mesh geometry={hoodGeo} material={bodyMat} position={[0, 0.15, 1.2]} castShadow receiveShadow />
      <mesh geometry={cabinGeo} material={bodyMat} position={[0, 1.3, -0.8]} castShadow receiveShadow />
      <mesh geometry={grilleGeo} material={chromeMat} position={[0, 0.2, 2.25]} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={new THREE.BoxGeometry(1.7, 0.08, 0.7)} material={chromeMat} position={[0, 0.55, 2.25]} />
      <mesh geometry={new THREE.BoxGeometry(1.7, 0.06, 0.02)} material={chromeMat} position={[0, 0.55, 2.27]} />
      <mesh geometry={new THREE.BoxGeometry(0.02, 0.6, 0.02)} material={chromeMat} position={[-0.8, 0.2, 2.26]} />
      <mesh geometry={new THREE.BoxGeometry(0.02, 0.6, 0.02)} material={chromeMat} position={[0.8, 0.2, 2.26]} />
      <mesh geometry={new THREE.BoxGeometry(1.4, 1.0, 0.02)} material={glassMat} position={[0, 1.3, -0.1]} />
      <mesh geometry={new THREE.BoxGeometry(1.4, 1.0, 0.02)} material={glassMat} position={[0, 1.3, -1.5]} rotation={[0, Math.PI, 0]} />
      <mesh geometry={new THREE.BoxGeometry(0.02, 1.0, 1.4)} material={glassMat} position={[0.72, 1.3, -0.8]} />
      <mesh geometry={new THREE.BoxGeometry(0.02, 1.0, 1.4)} material={glassMat} position={[-0.72, 1.3, -0.8]} />

      {wheelPositions.map((pos, i) => (
        <group key={i} position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={tireGeo} material={tireMat} castShadow receiveShadow />
          <mesh geometry={wheelGeo} material={chromeMat} position={[0, 0, 0.025]} castShadow receiveShadow />
        </group>
      ))}
    </group>
  );
};

export default function MustangScene() {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 40 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 4, -4]} intensity={0.5} />
      <Mustang />
    </Canvas>
  );
}