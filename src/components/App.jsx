import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { Mustang } from './Mustang';
import './styles.css';

export default function App() {
  return (
    <>
      <div className="title-overlay">🐴 1960 Mustang 3D — drag to orbit</div>
      <Canvas camera={{ position: [7, 3.2, 8], fov: 35 }} shadows>
        <Scene>
          <Mustang />
        </Scene>
      </Canvas>
    </>
  );
}
