import { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBox } from '@react-three/drei';

const W = 1.7;
const WHEEL_X = 1.45;
const WHEEL_Y = 0.45;
const WHEEL_R = 0.45;

function bodyProfile() {
  const s = new THREE.Shape();
  s.moveTo(-2.3, 0.25);
  s.lineTo(-2.3, 0.72);
  s.quadraticCurveTo(-2.25, 0.84, -1.9, 0.88);
  s.lineTo(-1.8, 0.88);
  s.quadraticCurveTo(-1.0, 1.16, -0.35, 1.25);
  s.lineTo(0.15, 1.25);
  s.quadraticCurveTo(0.36, 1.2, 0.55, 0.95);
  s.quadraticCurveTo(1.5, 0.92, 2.15, 0.9);
  s.quadraticCurveTo(2.3, 0.88, 2.3, 0.72);
  s.lineTo(2.3, 0.25);
  s.lineTo(1.95, 0.25);
  s.quadraticCurveTo(WHEEL_X, 1.45, 0.95, 0.25);
  s.lineTo(-0.95, 0.25);
  s.quadraticCurveTo(-WHEEL_X, 1.45, -1.95, 0.25);
  s.closePath();
  return s;
}

function sideWindow() {
  const s = new THREE.Shape();
  s.moveTo(-1.72, 0.92);
  s.lineTo(0.46, 0.92);
  s.lineTo(0.12, 1.2);
  s.lineTo(-0.52, 1.2);
  s.closePath();
  return s;
}

export function Mustang({ color = '#b01020' }) {
  const bodyGeo = useMemo(() => new THREE.ExtrudeGeometry(bodyProfile(), {
    depth: W,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.1,
    bevelSegments: 6,
    curveSegments: 32,
  }), []);
  const windowGeo = useMemo(() => new THREE.ExtrudeGeometry(sideWindow(), {
    depth: 0.02, bevelEnabled: false, curveSegments: 12,
  }), []);
  const wheelGeo = useMemo(() => new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, 0.26, 40), []);
  const hubGeo = useMemo(() => new THREE.CylinderGeometry(0.27, 0.27, 0.28, 40), []);
  const archGeo = useMemo(() => new THREE.TorusGeometry(0.5, 0.028, 10, 32, Math.PI), []);
  const lampGeo = useMemo(() => new THREE.CylinderGeometry(0.17, 0.17, 0.07, 28), []);
  const crestGeo = useMemo(() => new THREE.TorusGeometry(0.08, 0.014, 8, 20), []);

  const paintMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color, metalness: 0.35, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.1,
  }), [color]);
  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#dfe3e8', metalness: 0.95, roughness: 0.14,
  }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#111318', metalness: 0.4, roughness: 0.45,
  }), []);
  const wheelFaceMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#e6e9ee', metalness: 0.15, roughness: 0.35,
  }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0b0b0d', roughness: 0.95,
  }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#20303e', metalness: 0.1, roughness: 0.06, transparent: true, opacity: 0.58,
    clearcoat: 1,
  }), []);
  const headMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#fff8dd', emissive: '#ffe9a8', emissiveIntensity: 0.5, roughness: 0.1,
  }), []);
  const tailMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c00d16', emissive: '#8a0008', emissiveIntensity: 0.6, roughness: 0.2,
  }), []);

  const wheels = [];
  for (const x of [WHEEL_X, -WHEEL_X]) {
    for (const side of [-1, 1]) {
      const z = side * 0.87;
      const out = side * 0.16;
      wheels.push(
        <group key={`w-${x}-${side}`} position={[x, WHEEL_Y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={wheelGeo} material={tireMat} castShadow />
          <mesh geometry={hubGeo} material={wheelFaceMat} position={[0, out, 0]} castShadow />
          <mesh material={paintMat} position={[0, side * 0.32, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.02, 20]} />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh
              key={i}
              material={wheelFaceMat}
              position={[0, side * 0.31, 0]}
              rotation={[0, (i * Math.PI * 2) / 5, 0]}
            >
              <boxGeometry args={[0.045, 0.02, 0.2]} />
            </mesh>
          ))}
        </group>
      );
    }
  }

  return (
    <group>
      <mesh geometry={bodyGeo} material={paintMat} position={[0, 0, -W / 2]} castShadow receiveShadow />

      {[WHEEL_X, -WHEEL_X].map((x) => [-1, 1].map((side) => (
        <mesh
          key={`a-${x}-${side}`}
          geometry={archGeo}
          material={chromeMat}
          position={[x, WHEEL_Y, side * 0.96]}
        />
      )))}

      <mesh material={glassMat} position={[0.35, 1.1, 0]} rotation={[0, 0, 0.93]}>
        <boxGeometry args={[0.04, 0.52, 1.5]} />
      </mesh>
      <mesh material={glassMat} position={[-1.08, 1.06, 0]} rotation={[0, 0, 1.82]}>
        <boxGeometry args={[0.04, 1.5, 1.45]} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={`win-${side}`}
          geometry={windowGeo}
          material={glassMat}
          position={[0, 0, side > 0 ? 0.94 : -0.96]}
        />
      ))}

      {[-1, 1].map((side) => {
        const z = side * 0.97;
        return (
          <group key={`s-${side}`}>
            <mesh material={chromeMat} position={[0, 0.56, z]}>
              <boxGeometry args={[3.5, 0.035, 0.018]} />
            </mesh>
            <mesh material={darkMat} position={[-0.18, 0.68, z]}>
              <boxGeometry args={[0.018, 0.55, 0.012]} />
            </mesh>
            <mesh material={darkMat} position={[0.72, 0.68, z]}>
              <boxGeometry args={[0.018, 0.5, 0.012]} />
            </mesh>
            <mesh material={chromeMat} position={[0.34, 0.82, z]}>
              <boxGeometry args={[0.2, 0.045, 0.025]} />
            </mesh>
            <RoundedBox args={[0.14, 0.09, 0.06]} radius={0.02} smoothness={3} material={paintMat} position={[0.58, 1.02, side * 1.02]} />
          </group>
        );
      })}

      <group position={[2.4, 0, 0]}>
        <RoundedBox args={[0.07, 0.44, 1.18]} radius={0.02} smoothness={3} material={darkMat} position={[0, 0.66, 0]} />
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`g-${i}`} material={chromeMat} position={[0.05, 0.52 + i * 0.09, 0]}>
            <boxGeometry args={[0.02, 0.022, 1.08]} />
          </mesh>
        ))}
        <mesh geometry={crestGeo} material={chromeMat} position={[0.07, 0.66, 0]} rotation={[0, Math.PI / 2, 0]} />
        <mesh material={chromeMat} position={[0.07, 0.66, 0]}>
          <boxGeometry args={[0.02, 0.2, 0.02]} />
        </mesh>
        {[-0.66, 0.66].map((z) => (
          <mesh key={`h-${z}`} geometry={lampGeo} material={headMat} position={[0.02, 0.79, z]} rotation={[0, 0, Math.PI / 2]} />
        ))}
        <RoundedBox args={[0.2, 0.16, 1.9]} radius={0.05} smoothness={4} material={chromeMat} position={[0.04, 0.3, 0]} />
      </group>

      <group position={[-2.4, 0, 0]}>
        {[-0.66, 0.66].map((z) => (
          <mesh key={`t-${z}`} material={tailMat} position={[0, 0.7, z]}>
            <boxGeometry args={[0.05, 0.16, 0.34]} />
          </mesh>
        ))}
        <RoundedBox args={[0.2, 0.16, 1.88]} radius={0.05} smoothness={4} material={chromeMat} position={[-0.04, 0.3, 0]} />
        {[-0.42, 0.42].map((z) => (
          <mesh key={`e-${z}`} material={chromeMat} position={[-0.14, 0.2, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.18, 18]} />
          </mesh>
        ))}
      </group>

      {wheels}
    </group>
  );
}

export default Mustang;
