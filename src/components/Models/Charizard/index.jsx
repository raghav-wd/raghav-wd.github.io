import PropTypes from 'prop-types'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Shadow, Text, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useBox, useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'

const Charizard = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const gltf = useGLTF('./libs/charizard/scene.gltf')

  const model = {
    position: new THREE.Vector3(-6, 0, 20),
    rotation: new THREE.Vector3(0, -Math.PI, 0),
    options: {
      focusOnPosition: new THREE.Vector3(-6, 0.4, 20),
      animateToPosition: new THREE.Vector3(-6, 1.4, 10),
      fov: 30,
    },
  }

  const game = {}

  const collisionHandler = () => {
    setPage('game')
  }

  const [plane] = useBox(() => ({
    args: [11, 11, 0.0002],
    rotation: [-Math.PI / 2, 0, 0],
    position: [...model.position],
    // onCollide: collisionHandler,
  }))

  useEffect(
    () => (page === 'game' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, model.options)

  // eslint-disable-next-line react/prop-types
  const Fireball = ({ position }) => {
    const [fireballMesh, fireballApi] = useBox(() => ({
      mass: 1,
      args: [0.4, 0.4, 0.4],
      rotation: [-Math.PI / 2, 0, 0],
      // eslint-disable-next-line react/prop-types
      position: [...position],
      type: 'Dynamic',
      // onCollide: collisionHandler,
    }))

    useFrame(() => {
      fireballApi.velocity.set(0, 0, -1)
    })

    return (
      <mesh>
        <mesh ref={fireballMesh} position={position}>
          <boxBufferGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial />
        </mesh>
      </mesh>
    )
  }

  // const Fireballs = () => {

  // }

  return (
    <mesh>
      <mesh ref={plane} />
      <primitive
        rotation={[...model.rotation]}
        position={[...model.position]}
        scale={0.014}
        object={gltf.scene}
        dispose={null}
      />
      <Fireball position={[model.position.x, 0.1, model.position.z - 1]} />
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={2}
        opacity={0.15}
      />
    </mesh>
  )
}

Charizard.defaultProps = {
  page: '',
  setPage: null,
}

Charizard.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
}

export default Charizard
