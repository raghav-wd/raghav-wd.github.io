/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'

const Rhetorician = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const position = new THREE.Vector3(4, 0.1, 20)
  const focusOnPosition = new THREE.Vector3(4, 1.8, 25)
  const animateToPosition = new THREE.Vector3(0, 2.4, 5)
  const gltf = useGLTF('./libs/rhetorician/scene.gltf')

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

  useModelTransition(isActive, focusOnPosition, animateToPosition)

  return (
    <mesh>
      <mesh rotation={[0, (6 * Math.PI) / 5, 0]} position={[4, 2, 21]}>
        <planeBufferGeometry args={[7, 5]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh ref={mesh} wireframe="white" />
      <mesh rotation={[0, (6 * Math.PI) / 5, 0]} position={[4, 0, 20]}>
        <boxBufferGeometry args={[3, 0.5, 3]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <primitive
        rotation={[0, (6 * Math.PI) / 5, 0]}
        position={[4, 0, 20]}
        scale={0.5}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default Rhetorician
