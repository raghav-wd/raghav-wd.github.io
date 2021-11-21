/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, Shadow, Text } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'
import BillboardHoarding from '../BillboardHoarding'

const AshWithFriends = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const position = new THREE.Vector3(-4, 0.1, 20)
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
      <BillboardHoarding
        position={[position.x - 2, 0, position.z - 2]}
        scale={0.2}
        rotation={[0, -(6 * Math.PI) / 5, 0]}
      />
      <Text
        color="#212121"
        position={[position.x - 2, 1.5, position.z - 2.2]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[0, -(6 * Math.PI) / 5, 0]}
      >
        Connect
      </Text>
      <mesh ref={mesh} />
      <mesh
        rotation={[0, -(6 * Math.PI) / 5, 0]}
        position={[position.x, 0, position.z]}
        recieveShadow
      >
        <boxBufferGeometry args={[3, 0.5, 3]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        ref={ref}
        rotation={[0, -(6 * Math.PI) / 5, 0]}
        position={[position.x, 0.28, position.z]}
        scale={0.015}
        object={gltf.scene}
        dispose={null}
      />
      <Shadow
        position={[position.x, 0.001, position.z]}
        rotation-x={-Math.PI / 2}
        scale={6}
        opacity={0.15} // Alpha (default:0.5)
        fog
      />
    </mesh>
  )
}

export default AshWithFriends
