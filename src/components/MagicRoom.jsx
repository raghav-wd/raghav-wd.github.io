import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

const MagicRoom = () => {
  // Importing model
  const Model = () => {
    const gltf = useGLTF('./libs/the_magic_room/scene.gltf', true)
    return <primitive object={gltf.scene} dispose={null} scale={1} />
  }
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}

export default MagicRoom
