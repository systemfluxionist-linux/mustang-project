import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { Mustang } from './Mustang';

export default function App() {
  return (
    <Canvas camera={{ position: [0, 3, 8], fov: 45 }} shadows>
      <Scene>
        <Mustang />
      </Scene>
    </Canvas>
  );
}