/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'

const AshWithFriends = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const position = new THREE.Vector3(4, 0.1, 20)
  const focusOnPosition = new THREE.Vector3(4, 1.4, 25)
  const animateToPosition = new THREE.Vector3(0, 2.4, 5)
  const gltf = useGLTF('./libs/red_pokemon/scene.gltf')
  const ref = useRef()

  const options = {
    focusOnPosition,
    animateToPosition,
    fov: 12,
  }

  const collisionHandler = () => {
    setPage('about')
  }
  const [mesh, api] = useSphere(() => ({
    position: [...position],
    type: 'Static',
    args: [2.6],
    onCollide: collisionHandler,
  }))

  useEffect(
    () => (page === 'about' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, options)
  console.log(ref)

  return (
    <mesh>
      {/* <mesh rotation={[0, (6 * Math.PI) / 5, 0]} position={[4, 2, 21]}>
        <planeBufferGeometry args={[7, 5]} />
        <meshStandardMaterial color="white" />
      </mesh> */}
      {/* <pointLight position={[2, 3, 20]} color={0x311b92} intensity={1} /> */}
      <mesh ref={mesh} />
      <mesh
        rotation={[0, (6 * Math.PI) / 5, 0]}
        position={[4, 0, 20]}
        recieveShadow
      >
        <boxBufferGeometry args={[3, 0.5, 3]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <primitive
        ref={ref}
        rotation={[0, (6 * Math.PI) / 5, 0]}
        position={[4, 0.28, 20]}
        scale={0.015}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default AshWithFriends
