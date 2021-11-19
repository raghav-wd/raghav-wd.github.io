import { PerspectiveCamera, useGLTF, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useSphere } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import { useModelTransition } from '../../hooks'

// eslint-disable-next-line react/prop-types
const HologramConsole = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const position = new THREE.Vector3(-10, 0.05, 10)
  const focusOnPosition = new THREE.Vector3(-10, 0.8, 12)
  const animateToPosition = new THREE.Vector3(0, 2.4, 5)
  const gltf = useGLTF(
    './libs/smol_ame_in_an_upcycled_terrarium_hololiveen/scene.gltf'
  )

  const Billboard = () => {
    const billboard = useGLTF('./libs/billboard_hoarding/scene.gltf')
    return (
      <mesh>
        <Text
          color="#212121"
          position={[position.x + 0.1, 1.5, position.z - 3]}
          fontSize={0.2}
          letterSpacing={0.2}
          // strokeWidth={1}
          // strokeColor="black"
          fillOpacity={0}
          outlineColor="#212121"
          outlineWidth={0.01}
          rotation={[0, Math.PI / 2, 0]}
        >
          Projects
        </Text>
        <primitive
          rotation={[0, Math.PI / 2, 0]}
          position={[position.x, 0, position.z - 3]}
          scale={0.2}
          object={billboard.scene}
          dispose={null}
        />
      </mesh>
    )
  }

  const options = {
    focusOnPosition,
    animateToPosition,
    fov: 20,
  }

  const collisionHandler = () => {
    setPage('skills')
  }
  const [mesh, api] = useSphere(() => ({
    position: [...position],
    type: 'Static',
    args: [2.6],
    onCollide: collisionHandler,
  }))
  useEffect(
    () => (page === 'skills' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, options)

  return (
    <mesh>
      <mesh position={[...position]} rotation={[0, Math.PI / 2, 0]}>
        <boxBufferGeometry args={[3.6, 0.5, 3.6]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <Billboard />
      <mesh ref={mesh} />
      <primitive
        rotation={[0, Math.PI / 2, 0]}
        position={[position.x, 0.38, position.z]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default HologramConsole
