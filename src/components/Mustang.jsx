import { useMemo } from 'react';
import * as THREE from 'three';

const L = 4.6;
const W = 1.8;
const WHEEL_X = 1.5;
const WHEEL_Y = 0.5;
const WHEEL_R = 0.45;

const makeBodyProfile = () => {
  const s = new THREE.Shape();
  // rear lower -> tail -> trunk -> fastback -> roof -> windshield -> hood -> nose
  s.moveTo(-L / 2, 0.25);
  s.lineTo(-L / 2, 0.8);
  s.quadraticCurveTo(-2.05, 0.9, -1.7, 0.92);
  s.quadraticCurveTo(-0.7, 1.38, 0.25, 1.4);
  s.lineTo(0.72, 0.98);
  s.quadraticCurveTo(1.6, 0.92, 2.15, 0.9);
  s.lineTo(L / 2, 0.78);
  s.lineTo(L / 2, 0.25);
  // front lower edge -> front wheel arch
  s.lineTo(WHEEL_X + 0.5, 0.25);
  s.quadraticCurveTo(WHEEL_X, 1.65, WHEEL_X - 0.5, 0.25);
  // sill between arches
  s.lineTo(-WHEEL_X + 0.5, 0.25);
  // rear wheel arch -> rear lower edge
  s.quadraticCurveTo(-WHEEL_X, 1.65, -WHEEL_X - 0.5, 0.25);
  s.lineTo(-L / 2, 0.25);
  s.closePath();
  return s;
};

const makeSideWindow = () => {
  const s = new THREE.Shape();
  s.moveTo(-1.3, 1.0);
  s.lineTo(0.55, 1.0);
  s.lineTo(0.3, 1.34);
  s.lineTo(-0.85, 1.34);
  s.closePath();
  return s;
};

const makePony = () => {
  const s = new THREE.Shape();
  s.absarc(0, 0, 0.09, 0, Math.PI * 2, false);
  return s;
};

export function Mustang() {
  const bodyGeo = useMemo(
    () => new THREE.ExtrudeGeometry(makeBodyProfile(), {
      depth: W,
      bevelEnabled: true,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      bevelSegments: 3,
      curveSegments: 16,
    }),
    []
  );
  const windowGeo = useMemo(
    () => new THREE.ExtrudeGeometry(makeSideWindow(), { depth: 0.02, bevelEnabled: false }),
    []
  );
  const ponyGeo = useMemo(
    () => new THREE.ExtrudeGeometry(makePony(), { depth: 0.02, bevelEnabled: false }),
    []
  );
  const wheelGeo = useMemo(() => new THREE.CylinderGeometry(WHEEL_R, WHEEL_R, 0.28, 32), []);
  const hubGeo = useMemo(() => new THREE.CylinderGeometry(0.27, 0.27, 0.3, 32), []);
  const archGeo = useMemo(
    () => new THREE.TorusGeometry(0.53, 0.045, 8, 24, Math.PI),
    []
  );
  const headlightGeo = useMemo(() => new THREE.CylinderGeometry(0.16, 0.16, 0.08, 24), []);
  const exhaustGeo = useMemo(() => new THREE.CylinderGeometry(0.07, 0.07, 0.25, 16), []);

  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xb01020, metalness: 0.25, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12,
  }), []);
  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xe8e8ec, metalness: 0.95, roughness: 0.15,
  }), []);
  const darkMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x141414, metalness: 0.5, roughness: 0.5,
  }), []);
  const tireMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x0a0a0a, roughness: 0.95,
  }), []);
  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x26384a, metalness: 0.1, roughness: 0.08, transparent: true, opacity: 0.55,
  }), []);
  const lightMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xfff6d0, emissive: 0xfff0b0, emissiveIntensity: 0.6, roughness: 0.1,
  }), []);
  const tailMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xcc1111, emissive: 0xaa0000, emissiveIntensity: 0.5, roughness: 0.2,
  }), []);

  const wheels = [];
  for (const x of [WHEEL_X, -WHEEL_X]) {
    for (const side of [-1, 1]) {
      const z = side * (W / 2 - 0.02);
      wheels.push(
        <group key={`${x}-${side}`} position={[x, WHEEL_Y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={wheelGeo} material={tireMat} castShadow />
          <mesh geometry={hubGeo} material={chromeMat} position={[0, 0, side * 0.02]} castShadow />
          <mesh geometry={hubGeo} material={chromeMat} position={[0, 0, side * 0.04]} scale={[0.45, 1, 0.45]} />
        </group>
      );
    }
  }

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {/* main body: profile in XY, extruded through Z and centered */}
      <mesh geometry={bodyGeo} material={bodyMat} position={[0, 0, -W / 2]} castShadow receiveShadow />

      {/* wheel arch trim */}
      {[WHEEL_X, -WHEEL_X].map((x) => [-1, 1].map((side) => (
        <mesh
          key={`arch-${x}-${side}`}
          geometry={archGeo}
          material={chromeMat}
          position={[x, WHEEL_Y, side * (W / 2 + 0.03)]}
        />
      )))}

      {/* hood crease */}
      <mesh material={chromeMat} position={[1.45, 0.94, 0]}>
        <boxGeometry args={[1.3, 0.015, 0.03]} />
      </mesh>

      {/* windshield and side glass */}
      <mesh material={glassMat} position={[0.47, 1.18, 0]} rotation={[0, 0, 0.82]}>
        <boxGeometry args={[0.05, 0.62, 1.5]} />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={`window-${side}`}
          geometry={windowGeo}
          material={glassMat}
          position={[0, 0, side > 0 ? W / 2 + 0.01 : -W / 2 - 0.03]}
        />
      ))}

      {/* door seam, side strip, handles */}
      {[-1, 1].map((side) => {
        const z = side * (W / 2 + 0.035);
        return (
          <group key={`side-${side}`}>
            <mesh material={darkMat} position={[-0.12, 0.66, z]}>
              <boxGeometry args={[0.02, 0.68, 0.02]} />
            </mesh>
            <mesh material={chromeMat} position={[0, 0.52, z]}>
              <boxGeometry args={[3.2, 0.05, 0.02]} />
            </mesh>
            <mesh material={chromeMat} position={[0.25, 0.78, z]}>
              <boxGeometry args={[0.2, 0.05, 0.03]} />
            </mesh>
          </group>
        );
      })}

      {/* front fascia */}
      <group position={[L / 2 + 0.01, 0, 0]}>
        <mesh material={darkMat} position={[0.02, 0.66, 0]}>
          <boxGeometry args={[0.04, 0.42, 1.2]} />
        </mesh>
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={`bar-${i}`} material={chromeMat} position={[0.05, 0.52 + i * 0.07, 0]}>
            <boxGeometry args={[0.02, 0.022, 1.12]} />
          </mesh>
        ))}
        <mesh geometry={ponyGeo} material={chromeMat} position={[0.07, 0.66, 0]} rotation={[0, Math.PI / 2, 0]} />
        {[-0.62, 0.62].map((z) => (
          <mesh
            key={`hl-${z}`}
            geometry={headlightGeo}
            material={lightMat}
            position={[0.04, 0.78, z]}
            rotation={[0, 0, Math.PI / 2]}
          />
        ))}
        <mesh material={chromeMat} position={[0.08, 0.34, 0]}>
          <boxGeometry args={[0.18, 0.15, 1.92]} />
        </mesh>
      </group>

      {/* rear fascia */}
      <group position={[-L / 2 - 0.01, 0, 0]}>
        {[-0.62, 0.62].map((z) => (
          <mesh key={`tl-${z}`} material={tailMat} position={[-0.03, 0.68, z]}>
            <boxGeometry args={[0.04, 0.14, 0.32]} />
          </mesh>
        ))}
        <mesh material={chromeMat} position={[-0.08, 0.34, 0]}>
          <boxGeometry args={[0.18, 0.15, 1.9]} />
        </mesh>
        {[-0.45, 0.45].map((z) => (
          <mesh
            key={`ex-${z}`}
            geometry={exhaustGeo}
            material={chromeMat}
            position={[-0.16, 0.22, z]}
            rotation={[0, 0, Math.PI / 2]}
          />
        ))}
      </group>

      {wheels}
    </group>
  );
}

export default Mustang;
