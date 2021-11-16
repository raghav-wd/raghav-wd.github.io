/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'

const Rhetorician = ({ page, setPage }) => {
  const position = new THREE.Vector3(4, 0.1, 20)
  const gltf = useGLTF('./libs/rhetorician/scene.gltf')

  const collisionHandler = () => {
    setPage('skills')
  }
  const [mesh, api] = useSphere(() => ({
    position: [...position],
    type: 'Static',
    args: [2.6],
    onCollide: collisionHandler,
  }))

  return (
    <mesh>
      <mesh rotation={[0, (6 * Math.PI) / 5, 0]} position={[4, 2, 21]}>
        <planeBufferGeometry args={[7, 5]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh ref={mesh} />
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
