import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { Mustang } from './Mustang';

export default function App() {
  return (
    <Canvas camera={{ position: [7, 3, 8], fov: 35 }} shadows>
      <Scene>
        <Mustang />
      </Scene>
    </Canvas>
  );
}