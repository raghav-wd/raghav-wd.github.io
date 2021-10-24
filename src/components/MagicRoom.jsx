import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Stars, useAnimations, Sky } from '@react-three/drei'

const MagicRoom = () => {
  // Importing model
  const Model = () => {
    const gltf = useGLTF('./libs/3_seconds_of_vacations/scene.gltf', true)
    const { ref, names, actions } = useAnimations(gltf.animations)
    useEffect(() => {
    actions[names[0]].play()
  })
    return (
      <primitive
        object={gltf.scene}
        ref={ref}
        dispose={null}
        scale={10}
        rotation={[0, Math.PI * 1.18, 0]}
        position={[0, -20, 0]}
      />
    )
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 100], fov: 45 }}
      style={{ height: '100vh', width: '100%' }}
    >
      <Suspense fallback={null}>
        <OrbitControls enablePan enableZoom enableRotate />
        <Sky azimuth={1} inclination={0.6} distance={1000} />
        <fog attach="fog" args={['#ffffff', 0, 300 ]} />
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
