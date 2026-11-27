import { useMemo } from 'react';
import * as THREE from 'three';

const createBodyProfile = () => {
  const shape = new THREE.Shape();
  const L = 4.6, H = 1.3, W = 1.7;
  const hoodH = 0.95, cowlH = 1.15, roofH = 1.25, trunkH = 0.85;
  const fenderR = 0.45, wheelR = 0.48;

  shape.moveTo(-L / 2, -0.05);
  shape.lineTo(-L / 2 + 0.15, 0.15);
  shape.lineTo(-L / 2 + 0.4, 0.15);
  shape.lineTo(-L / 2 + 0.55, 0.35);
  shape.lineTo(-L / 2 + 0.7, 0.35);
  shape.lineTo(-L / 2 + 0.85, 0.15);
  shape.lineTo(-L / 2 + 1.2, 0.15);
  shape.lineTo(-L / 2 + 1.5, 0.35);

  shape.bezierCurveTo(
    -L / 2 + 1.8, 0.55,
    -L / 2 + 2.0, 0.85,
    -L / 2 + 2.1, 1.15
  );
  shape.lineTo(-L / 2 + 2.1, cowlH);
  shape.lineTo(-L / 2 + 2.3, roofH);
  shape.lineTo(L / 2 - 2.0, roofH);
  shape.lineTo(L / 2 - 1.8, roofH - 0.1);
  shape.lineTo(L / 2 - 1.5, trunkH);
  shape.lineTo(L / 2 - 1.0, trunkH - 0.1);
  shape.lineTo(L / 2 - 0.6, trunkH - 0.15);
  shape.lineTo(L / 2 - 0.3, trunkH - 0.2);
  shape.lineTo(L / 2, trunkH - 0.25);
  shape.lineTo(L / 2, -0.05);
  shape.lineTo(-L / 2, -0.05);

  const frontArch = new THREE.Path();
  frontArch.absarc(-L / 2 + 1.5, -0.05, wheelR + 0.05, 0, Math.PI * 2, false);
  shape.holes.push(frontArch);

  const rearArch = new THREE.Path();
  rearArch.absarc(L / 2 - 1.5, -0.05, wheelR + 0.05, 0, Math.PI * 2, false);
  shape.holes.push(rearArch);

  return shape;
};

const createHoodCrease = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-1.0, 0);
  shape.lineTo(-0.95, 0);
  shape.lineTo(0.0, 0.08);
  shape.lineTo(0.95, 0);
  shape.lineTo(1.0, 0);
  shape.lineTo(0.95, 0);
  shape.lineTo(0.0, -0.08);
  shape.lineTo(-0.95, 0);
  return shape;
};

const createGrilleBars = () => {
  const bars = [];
  const count = 7;
  const width = 1.4, height = 0.5;
  for (let i = 0; i < count; i++) {
    const y = -height / 2 + (i + 0.5) * (height / count);
    bars.push({ y, width: width * 0.95, height: height / count * 0.7 });
  }
  return bars;
};

const createPonyEmblem = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.15, -0.05);
  shape.bezierCurveTo(-0.15, 0.08, -0.05, 0.12, 0.0, 0.1);
  shape.bezierCurveTo(0.05, 0.12, 0.15, 0.08, 0.15, -0.05);
  shape.bezierCurveTo(0.15, -0.15, 0.05, -0.18, 0.0, -0.15);
  shape.bezierCurveTo(-0.05, -0.18, -0.15, -0.15, -0.15, -0.05);
  return shape;
};

const createHeadlight = () => {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 0.18, 0, Math.PI * 2);
  return shape;
};

const createTaillight = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.12, -0.15);
  shape.lineTo(0.12, -0.15);
  shape.lineTo(0.1, 0.15);
  shape.lineTo(-0.1, 0.15);
  return shape;
};

const createDoorSeam = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.01, -0.4);
  shape.lineTo(0.01, -0.4);
  shape.lineTo(0.01, 0.4);
  shape.lineTo(-0.01, 0.4);
  return shape;
};

const createSideStrip = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-1.6, 0);
  shape.lineTo(1.6, 0);
  shape.lineTo(1.6, 0.04);
  shape.lineTo(-1.6, 0.04);
  return shape;
};

const createDoorHandle = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.08, -0.02);
  shape.lineTo(0.08, -0.02);
  shape.lineTo(0.08, 0.02);
  shape.lineTo(-0.08, 0.02);
  return shape;
};

const createExhaustTip = () => {
  const shape = new THREE.Shape();
  shape.absarc(0, 0, 0.045, 0, Math.PI * 2);
  return shape;
};

const createBumper = (length, height, depth) => {
  const shape = new THREE.Shape();
  const r = height / 2;
  shape.moveTo(-length / 2, 0);
  shape.lineTo(-length / 2 + r, 0);
  shape.quadraticCurveTo(-length / 2, 0, -length / 2, r);
  shape.lineTo(-length / 2, height - r);
  shape.quadraticCurveTo(-length / 2, height, -length / 2 + r, height);
  shape.lineTo(length / 2 - r, height);
  shape.quadraticCurveTo(length / 2, height, length / 2, height - r);
  shape.lineTo(length / 2, r);
  shape.quadraticCurveTo(length / 2, 0, length / 2 - r, 0);
  shape.lineTo(-length / 2, 0);
  return shape;
};

const createFender = () => {
  const shape = new THREE.Shape();
  const w = 0.7, h = 0.55;
  shape.moveTo(-w / 2, 0);
  shape.lineTo(-w / 2 + 0.1, 0);
  shape.quadraticCurveTo(-w / 2, 0, -w / 2, 0.1);
  shape.lineTo(-w / 2, h - 0.1);
  shape.quadraticCurveTo(-w / 2, h, -w / 2 + 0.1, h);
  shape.lineTo(w / 2 - 0.1, h);
  shape.quadraticCurveTo(w / 2, h, w / 2, h - 0.1);
  shape.lineTo(w / 2, 0.1);
  shape.quadraticCurveTo(w / 2, 0, w / 2 - 0.1, 0);
  shape.lineTo(-w / 2, 0);
  return shape;
};

const createWindshield = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.7, -0.1);
  shape.lineTo(0.7, -0.1);
  shape.lineTo(0.65, 0.55);
  shape.lineTo(-0.65, 0.55);
  return shape;
};

const createSideWindow = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.05, -0.05);
  shape.lineTo(1.3, -0.05);
  shape.lineTo(1.15, 0.45);
  shape.lineTo(-0.05, 0.45);
  return shape;
};

const createRearWindow = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.65, -0.1);
  shape.lineTo(0.65, -0.1);
  shape.lineTo(0.5, 0.4);
  shape.lineTo(-0.5, 0.4);
  return shape;
};

const createTrunkDeck = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-0.8, -0.1);
  shape.lineTo(0.8, -0.1);
  shape.lineTo(0.7, 0.05);
  shape.lineTo(-0.7, 0.05);
  return shape;
};

const createHood = () => {
  const shape = new THREE.Shape();
  shape.moveTo(-1.1, -0.05);
  shape.lineTo(1.1, -0.05);
  shape.lineTo(1.0, 0.5);
  shape.lineTo(-1.0, 0.5);
  return shape;
};

const Mustang = () => {
  const L = 4.6, W = 1.7, H = 1.3;
  const wheelR = 0.48, wheelW = 0.3;
  const wheelBase = 2.7;
  const frontAxle = -L / 2 + 1.5;
  const rearAxle = L / 2 - 1.5;

  const bodyProfile = useMemo(() => createBodyProfile(), []);
  const bodyGeo = useMemo(
    () => new THREE.ExtrudeGeometry(bodyProfile, { depth: W, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 4 }),
    [bodyProfile]
  );

  const hoodCreaseGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createHoodCrease(), { depth: 0.04, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 2 }),
    []
  );

  const grilleBarGeo = useMemo(
    () => new THREE.ExtrudeGeometry(new THREE.Shape().moveTo(-0.7, -0.03).lineTo(0.7, -0.03).lineTo(0.7, 0.03).lineTo(-0.7, 0.03), { depth: 0.02 }),
    []
  );

  const ponyGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createPonyEmblem(), { depth: 0.03, bevelEnabled: true, bevelThickness: 0.005, bevelSize: 0.005, bevelSegments: 2 }),
    []
  );

  const headlightGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createHeadlight(), { depth: 0.08, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 3 }),
    []
  );

  const taillightGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createTaillight(), { depth: 0.06, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }),
    []
  );

  const doorSeamGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createDoorSeam(), { depth: 0.01 }),
    []
  );

  const sideStripGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createSideStrip(), { depth: 0.015 }),
    []
  );

  const doorHandleGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createDoorHandle(), { depth: 0.03 }),
    []
  );

  const exhaustGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createExhaustTip(), { depth: 0.15 }),
    []
  );

  const frontBumperGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createBumper(1.8, 0.18, 0.08), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }),
    []
  );

  const rearBumperGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createBumper(1.6, 0.15, 0.08), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }),
    []
  );

  const fenderGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createFender(), { depth: 0.15, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 }),
    []
  );

  const windshieldGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createWindshield(), { depth: 0.02 }),
    []
  );

  const sideWindowGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createSideWindow(), { depth: 0.02 }),
    []
  );

  const rearWindowGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createRearWindow(), { depth: 0.02 }),
    []
  );

  const trunkDeckGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createTrunkDeck(), { depth: 0.02, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.01, bevelSegments: 2 }),
    []
  );

  const hoodGeo = useMemo(
    () => new THREE.ExtrudeGeometry(createHood(), { depth: W * 0.95, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 3 }),
    []
  );

  const tireGeo = useMemo(
    () => new THREE.CylinderGeometry(wheelR, wheelR, wheelW, 32),
    [wheelR, wheelW]
  );

  const hubcapGeo = useMemo(
    () => new THREE.CylinderGeometry(wheelR * 0.55, wheelR * 0.55, wheelW * 0.1, 32),
    [wheelR, wheelW]
  );

  const hubcapSpokeGeo = useMemo(
    () => new THREE.BoxGeometry(0.015, wheelR * 0.5, wheelW * 0.12),
    [wheelR, wheelW]
  );

  const bodyMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: 0x8b0000,
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
    }),
    []
  );

  const chromeMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: 0xdddddd,
      roughness: 0.08,
      metalness: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    }),
    []
  );

  const glassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: 0x1a2a3a,
      roughness: 0.05,
      metalness: 0.0,
      transparent: true,
      opacity: 0.35,
      transmission: 0.8,
      thickness: 0.02,
      ior: 1.5,
    }),
    []
  );

  const tireMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 0.9 }),
    []
  );

  const darkChromeMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      roughness: 0.3,
      metalness: 0.8,
    }),
    []
  );

  const headlightGlassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: 0xffffee,
      roughness: 0.02,
      metalness: 0.0,
      transparent: true,
      opacity: 0.9,
      transmission: 0.95,
      thickness: 0.08,
      ior: 1.5,
      emissive: 0xffffee,
      emissiveIntensity: 0.15,
    }),
    []
  );

  const taillightGlassMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      color: 0xcc0000,
      roughness: 0.05,
      metalness: 0.0,
      transparent: true,
      opacity: 0.85,
      transmission: 0.7,
      thickness: 0.06,
      ior: 1.5,
      emissive: 0xcc0000,
      emissiveIntensity: 0.3,
    }),
    []
  );

  return (
    <group>
      <mesh geometry={bodyGeo} material={bodyMat} position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={hoodGeo} material={bodyMat} position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={hoodCreaseGeo} material={bodyMat} position={[0, 1.0, 0.02]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />

      <mesh geometry={windshieldGeo} material={glassMat} position={[0, 1.15, W / 2 - 0.01]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={windshieldGeo} material={glassMat} position={[0, 1.15, -W / 2 + 0.01]} rotation={[-Math.PI / 2, Math.PI, 0]} castShadow receiveShadow />

      <mesh geometry={sideWindowGeo} material={glassMat} position={[-1.2, 1.15, W / 2 - 0.01]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={sideWindowGeo} material={glassMat} position={[1.2, 1.15, -W / 2 + 0.01]} rotation={[-Math.PI / 2, Math.PI, 0]} castShadow receiveShadow />
      <mesh geometry={rearWindowGeo} material={glassMat} position={[1.85, 1.15, W / 2 - 0.01]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={rearWindowGeo} material={glassMat} position={[1.85, 1.15, -W / 2 + 0.01]} rotation={[-Math.PI / 2, Math.PI, 0]} castShadow receiveShadow />

      <mesh geometry={trunkDeckGeo} material={bodyMat} position={[2.2, 0.85, W / 2 - 0.01]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={trunkDeckGeo} material={bodyMat} position={[2.2, 0.85, -W / 2 + 0.01]} rotation={[-Math.PI / 2, Math.PI, 0]} castShadow receiveShadow />

      <mesh geometry={doorSeamGeo} material={darkChromeMat} position={[-1.15, 0.5, W / 2 + 0.01]} rotation={[0, 0, 0]} />
      <mesh geometry={doorSeamGeo} material={darkChromeMat} position={[1.15, 0.5, -W / 2 - 0.01]} rotation={[0, Math.PI, 0]} />
      <mesh geometry={doorSeamGeo} material={darkChromeMat} position={[-1.15, 0.5, -W / 2 - 0.01]} rotation={[0, Math.PI, 0]} />
      <mesh geometry={doorSeamGeo} material={darkChromeMat} position={[1.15, 0.5, W / 2 + 0.01]} rotation={[0, 0, 0]} />

      <mesh geometry={sideStripGeo} material={chromeMat} position={[-0.1, 0.2, W / 2 + 0.01]} rotation={[0, 0, 0]} />
      <mesh geometry={sideStripGeo} material={chromeMat} position={[0.1, 0.2, -W / 2 - 0.01]} rotation={[0, Math.PI, 0]} />

      <mesh geometry={doorHandleGeo} material={chromeMat} position={[-1.0, 0.4, W / 2 + 0.02]} rotation={[0, 0, 0]} />
      <mesh geometry={doorHandleGeo} material={chromeMat} position={[1.0, 0.4, -W / 2 - 0.02]} rotation={[0, Math.PI, 0]} />
      <mesh geometry={doorHandleGeo} material={chromeMat} position={[-1.0, 0.4, -W / 2 - 0.02]} rotation={[0, Math.PI, 0]} />
      <mesh geometry={doorHandleGeo} material={chromeMat} position={[1.0, 0.4, W / 2 + 0.02]} rotation={[0, 0, 0]} />

      <group position={[-L / 2 + 0.1, 0.3, 0]}>
        <mesh geometry={frontBumperGeo} material={chromeMat} position={[0, 0, W / 2 + 0.06]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
        <mesh geometry={frontBumperGeo} material={chromeMat} position={[0, 0, -W / 2 - 0.06]} rotation={[-Math.PI / 2, Math.PI, 0]} castShadow receiveShadow />

        {createGrilleBars().map((bar, i) => (
          <mesh
            key={i}
            geometry={grilleBarGeo}
            material={chromeMat}
            position={[0, bar.y + 0.3, W / 2 + 0.12]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        ))}

        <mesh geometry={ponyGeo} material={chromeMat} position={[0, 0.3, W / 2 + 0.16]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />

        <mesh geometry={headlightGeo} material={headlightGlassMat} position={[-0.65, 0.28, W / 2 + 0.14]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
        <mesh geometry={headlightGeo} material={headlightGlassMat} position={[0.65, 0.28, W / 2 + 0.14]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
        <mesh geometry={headlightGeo} material={headlightGlassMat} position={[-0.65, 0.28, -W / 2 - 0.14]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
        <mesh geometry={headlightGeo} material={headlightGlassMat} position={[0.65, 0.28, -W / 2 - 0.14]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
      </group>

      <group position={[L / 2 - 0.1, 0.25, 0]}>
        <mesh geometry={rearBumperGeo} material={chromeMat} position={[0, 0, W / 2 + 0.06]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
        <mesh geometry={rearBumperGeo} material={chromeMat} position={[0, 0, -W / 2 - 0.06]} rotation={[-Math.PI / 2, Math.PI, 0]} castShadow receiveShadow />

        <mesh geometry={taillightGeo} material={taillightGlassMat} position={[-0.55, 0.0, W / 2 + 0.12]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
        <mesh geometry={taillightGeo} material={taillightGlassMat} position={[0.55, 0.0, W / 2 + 0.12]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
        <mesh geometry={taillightGeo} material={taillightGlassMat} position={[-0.55, 0.0, -W / 2 - 0.12]} rotation={[-Math.PI / 2, 0, 0]} castShadow />
        <mesh geometry={taillightGeo} material={taillightGlassMat} position={[0.55, 0.0, -W / 2 - 0.12]} rotation={[-Math.PI / 2, 0, 0]} castShadow />

        <mesh geometry={exhaustGeo} material={chromeMat} position={[-0.3, -0.25, W / 2 + 0.16]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
        <mesh geometry={exhaustGeo} material={chromeMat} position={[-0.3, -0.25, -W / 2 - 0.16]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      </group>

      <mesh geometry={fenderGeo} material={bodyMat} position={[frontAxle, 0.35, W / 2 + 0.08]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={fenderGeo} material={bodyMat} position={[frontAxle, 0.35, -W / 2 - 0.08]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={fenderGeo} material={bodyMat} position={[rearAxle, 0.35, W / 2 + 0.08]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />
      <mesh geometry={fenderGeo} material={bodyMat} position={[rearAxle, 0.35, -W / 2 - 0.08]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow />

      {[frontAxle, rearAxle].map((axle, ai) =>
        [-1, 1].map((side, si) => (
          <group key={`${ai}-${si}`} position={[axle, -0.05, side * (W / 2 + 0.02)]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh geometry={tireGeo} material={tireMat} castShadow receiveShadow />
            <mesh geometry={hubcapGeo} material={chromeMat} position={[0, 0, wheelW / 2 + 0.005]} castShadow receiveShadow />
            <mesh geometry={hubcapSpokeGeo} material={chromeMat} position={[0, 0, wheelW / 2 + 0.015]} castShadow receiveShadow />
            <mesh geometry={hubcapSpokeGeo} material={chromeMat} position={[0, 0, wheelW / 2 + 0.015]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow />
            <mesh geometry={hubcapSpokeGeo} material={chromeMat} position={[0, 0, wheelW / 2 + 0.015]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow />
            <mesh geometry={hubcapSpokeGeo} material={chromeMat} position={[0, 0, wheelW / 2 + 0.015]} rotation={[0, 0, 3 * Math.PI / 4]} castShadow receiveShadow />
          </group>
        ))
      )}
    </group>
  );
};

export { Mustang };