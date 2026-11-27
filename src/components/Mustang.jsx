import { Suspense, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL = '/models/mustang-2005.glb';

function Car({ color }) {
  const { scene } = useGLTF(MODEL);

  const model = useMemo(() => {
    const copy = scene.clone(true);
    copy.scale.setScalar(1.3);
    copy.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.castShadow = true;
      obj.receiveShadow = true;
      const name = obj.material?.name?.toLowerCase() || '';
      if (name.includes('carpaint')) {
        obj.material = new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.35,
          roughness: 0.22,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        });
      }
    });
    const box = new THREE.Box3().setFromObject(copy);
    const center = box.getCenter(new THREE.Vector3());
    copy.position.set(-center.x, -box.min.y, -center.z);
    return copy;
  }, [scene, color]);

  return <primitive object={model} />;
}

export function Mustang({ color = '#b01020' }) {
  return (
    <Suspense fallback={null}>
      <Car color={color} />
    </Suspense>
  );
}

useGLTF.preload(MODEL);
export default Mustang;
