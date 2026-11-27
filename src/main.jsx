import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Html center>
        <div style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>
          1960 Mustang 3D
        </div>
      </Html>
      <OrbitControls />
    </>
  )
}

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Scene />
    </Canvas>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)