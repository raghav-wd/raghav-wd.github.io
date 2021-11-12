import { PerspectiveCamera, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'
import { useModelTransition } from '../../hooks'

const HologramConsole = () => {
  const skillCamRef = useRef(null)
  const gltf = useGLTF(
    './libs/smol_ame_in_an_upcycled_terrarium_hololiveen/scene.gltf'
  )

  useModelTransition()

  return (
    <mesh>
      <primitive
        rotation={[0, Math.PI / 2, 0]}
        position={[-10, 0.05, 10]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
      <PerspectiveCamera
        position={[-10, 1, 9]}
        fov={60}
        ref={skillCamRef}
        makeDefault // Registers it as the default camera system-wide (default=false)
      />
    </mesh>
  )
}

export default HologramConsole
