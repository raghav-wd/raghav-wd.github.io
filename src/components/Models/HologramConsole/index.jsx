import { PerspectiveCamera, useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useModelTransition } from '../../hooks'

// eslint-disable-next-line react/prop-types
const HologramConsole = ({ page, setPage }) => {
  const position = new THREE.Vector3(-10, 0.05, 10)
  const skillCamRef = useRef(null)
  const dummy = useRef(null)
  const gltf = useGLTF(
    './libs/smol_ame_in_an_upcycled_terrarium_hololiveen/scene.gltf'
  )

  const collisionHandler = () => {
    setPage('skills')
  }
  const [mesh, api] = useSphere(() => ({
    position: [...position],
    type: 'Static',
    args: [2.6],
    onCollide: collisionHandler,
  }))
  useEffect(() => {
    console.log(page)
  }, [page])

  useModelTransition(page, 'skills')

  return (
    <mesh>
      <mesh ref={mesh} />
      <primitive
        rotation={[0, Math.PI / 2, 0]}
        position={[...position]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
      {/* <PerspectiveCamera
        position={[-10, 1, 9]}
        fov={60}
        ref={skillCamRef}
        makeDefault // Registers it as the default camera system-wide (default=false)
        /> */}
    </mesh>
  )
}

export default HologramConsole
