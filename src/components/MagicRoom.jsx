/* eslint-disable */
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  OrbitControls,
  Stars,
  useAnimations,
  Sky,
} from '@react-three/drei'

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
        <Sky
          distance={250}
          sunPosition={[3, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
          inclination={0} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25}/>
        <fog attach="fog" args={['#ffffff', 0, 300]} />
        <Model />
        <Rotate>
          <Stars
          radius={8} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={50000} // Amount of stars (default=5000)
          factor={2} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        </Rotate>
      </Suspense>
    </Canvas>
  )
}

function Rotate(props) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x += 0.001
    ref.current.rotation.y -= 0.002
  });
  return <group ref={ref} {...props} />;
}

export default MagicRoom
