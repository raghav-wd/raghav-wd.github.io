import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from'three'
import { useGLTF, Stars, useAnimations, Sky, Html, OrbitControls, Billboard } from '@react-three/drei'

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
        scale={8}
        rotation={[0, Math.PI * 1.18, 0]}
        position={[0, -13, 0]}
      />
    )
  }

  return (
    <Canvas
      dpr={[1, 2]}
      linear
      camera={{ position: [0, 0, 100], fov: 45 }}
      style={{ height: '100vh', width: '100%' }}
    >
      <Suspense fallback={null}>
        {/* <OrbitControls mouseButtons={{ "Left": null}} touches={{"ONE": THREE.TOUCH.DOLLY_PAN}} autoRotate enableScroll={false} enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 200} minPolarAngle={Math.PI / 20} /> */}
        {/* <Sky azimuth={1} inclination={0.6} distance={1000} /> */}
        <fog attach="fog" args={['#ffffff', 0, 300]} />
        <Billboard>
        <Model />
        </Billboard>
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
