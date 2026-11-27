import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './Scene';
import { Mustang } from './Mustang';
import './styles.css';

const PAINTS = [
  { hex: '#b01020', name: 'Race Red' },
  { hex: '#1a1a2e', name: 'Midnight' },
  { hex: '#c8c8c8', name: 'Frost' },
  { hex: '#0f0f0f', name: 'Onyx' },
];

export default function App() {
  const [paint, setPaint] = useState('#b01020');

  return (
    <>
      <Canvas
        shadows
        camera={{ position: [7, 3.2, 8], fov: 35 }}
        dpr={[1, 1.75]}
      >
        <Scene>
          <Mustang color={paint} />
        </Scene>
      </Canvas>
      <div className="overlay">
        <header className="top-bar" role="banner">
          <span className="wordmark" aria-hidden="true">MUSTANG / GT</span>
          <span className="subwordmark">2005 · 3D STUDY</span>
        </header>
        <main className="hero" role="main">
          <span className="kicker">THE ICON, REIMAGINED</span>
          <h1 className="display">MUSTANG GT</h1>
          <p className="copy">The pony car icon, rendered in real time. Choose a finish and explore every angle.</p>
          <div className="specs" aria-hidden="true">4.7 m · 2+2 · V8</div>
        </main>
        <div className="swatches" role="group" aria-label="Paint colors">
          {PAINTS.map(({ hex, name }) => (
            <button
              key={hex}
              className={`swatch${paint === hex ? ' active' : ''}`}
              style={{ '--swatch-color': hex }}
              onClick={() => setPaint(hex)}
              aria-label={`Select ${name}`}
              aria-pressed={paint === hex}
            />
          ))}
        </div>
        <footer className="hint" aria-hidden="true">
          Drag to orbit · Scroll to zoom
          <span className="credit">CC BY 4.0 model · Ricy</span>
        </footer>
      </div>
    </>
  );
}