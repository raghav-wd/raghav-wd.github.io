/* eslint-disable */
import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const LaprasInLake = () => {
  const gltf = useGLTF('./libs/lapras_in_lake/scene.gltf')

  return (
    <mesh>
      <primitive
        rotation={[0, Math.PI / 2, 0]}
        position={[-20, 0, 35]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

useGLTF.preload('./libs/lapras_in_lake/scene.gltf')

export default LaprasInLake
