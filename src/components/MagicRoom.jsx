// eslint-disable
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars } from '@react-three/drei'

const MagicRoom = () => {
  // Importing model
  const Model = () => {
    const gltf = useGLTF('./libs/3_seconds_of_vacations/scene.gltf', true)
    return (
      <primitive
        object={gltf.scene}
        dispose={null}
        scale={10}
        position={[0, -12, 0]}
      />
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 65 }}
      style={{ height: '100vh', width: '100%' }}
    >
      <Suspense fallback={null}>
        <OrbitControls enablePan enableZoom enableRotate />
        <Model />
        <Stars
          radius={8} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={10000} // Amount of stars (default=5000)
          factor={2} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
      </Suspense>
    </Canvas>
  )
}

export default MagicRoom
