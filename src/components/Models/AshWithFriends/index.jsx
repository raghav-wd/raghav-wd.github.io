import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, Shadow, Text } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'
import BillboardHoarding from '../BillboardHoarding'

const AshWithFriends = ({ page = '', setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const gltf = useGLTF('./libs/red_pokemon/scene.gltf')
  const ref = useRef()
  const model = {
    position: new THREE.Vector3(2, 0.1, 26),
    rotation: new THREE.Vector3(0, (6 * Math.PI) / 5, 0),
    options: {
      focusOnPosition: new THREE.Vector3(0, 1.4, 22),
      animateToPosition: new THREE.Vector3(-2, 2.4, 5),
      fov: 12,
    },
  }

  const collisionHandler = () => {
    setPage('about')
  }

  const [mesh] = useSphere(() => ({
    position: [...model.position],
    type: 'Static',
    args: [2.6],
    onCollide: collisionHandler,
  }))

  useEffect(
    () => (page === 'about' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, model.options)

  return (
    <mesh>
      <BillboardHoarding
        position={[model.position.x - 2, 0, model.position.z - 2]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <Text
        color="#212121"
        position={[model.position.x - 2, 1.5, model.position.z - 2.2]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Connect
      </Text>
      <mesh ref={mesh} />
      <mesh
        rotation={[...model.rotation]}
        position={[model.position.x, 0, model.position.z]}
        recieveShadow
      >
        <boxBufferGeometry args={[3, 0.5, 3]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        ref={ref}
        rotation={[...model.rotation]}
        position={[model.position.x, 0.28, model.position.z]}
        scale={0.015}
        object={gltf.scene}
        dispose={null}
      />
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={6}
        opacity={0.15}
        fog
      />
    </mesh>
  )
}

AshWithFriends.defaultProps = {
  page: '',
  setPage: null,
}

AshWithFriends.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
}

useGLTF.preload('./libs/red_pokemon/scene.gltf')

export default AshWithFriends
