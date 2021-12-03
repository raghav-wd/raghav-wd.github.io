import PropTypes from 'prop-types'
import { useAnimations, useGLTF, Shadow, Text } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'
import BillboardHoarding from '../BillboardHoarding'

const HologramConsole = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const gltf = useGLTF(
    './libs/smol_ame_in_an_upcycled_terrarium_hololiveen/scene.gltf'
  )
  const { ref: hologramConsoleRef, actions: hologramConsoleActions } =
    useAnimations(gltf.animations)

  const model = {
    position: new THREE.Vector3(-10, 0.05, 9),
    rotation: new THREE.Vector3(0, Math.PI / 2, 0),
    blendDuration: 0.4,
    options: {
      focusOnPosition: new THREE.Vector3(-8, 0.8, 7),
      animateToPosition: new THREE.Vector3(0, 2.4, 5),
      fov: 30,
    },
  }

  const collisionHandler = () => {
    setPage('skills')
  }

  const [mesh] = useSphere(() => ({
    position: [...model.position],
    type: 'Static',
    args: [2.6],
    onCollide: collisionHandler,
  }))
  useEffect(
    () => (page === 'skills' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, model.options)

  useEffect(() => {
    if (isActive)
      hologramConsoleActions.Animation.reset()
        .fadeIn(model.blendDuration)
        .play()
    else hologramConsoleActions.Animation.reset().fadeOut(model.blendDuration)
  }, [isActive])

  return (
    <mesh>
      <mesh position={[...model.position]} rotation={[...model.rotation]}>
        <boxBufferGeometry args={[3.6, 0.5, 3.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <BillboardHoarding
        position={[model.position.x, 0, model.position.z - 3]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <Text
        color="#212121"
        position={[model.position.x + 0.2, 1.5, model.position.z - 3.3]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Projects
      </Text>
      <mesh ref={mesh} />
      <primitive
        ref={hologramConsoleRef}
        rotation={[...model.rotation]}
        position={[model.position.x, 0.38, model.position.z]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={6}
        opacity={0.15}
      />
    </mesh>
  )
}

HologramConsole.defaultProps = {
  page: '',
  setPage: null,
}

HologramConsole.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
}

useGLTF.preload(
  './libs/smol_ame_in_an_upcycled_terrarium_hololiveen/scene.gltf'
)

export default HologramConsole
