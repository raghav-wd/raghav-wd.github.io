import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF, Shadow, Text } from '@react-three/drei'
import { useBox, useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'
import BillboardHoarding from '../BillboardHoarding'

const AshWithFriends = ({ page = '' }) => {
  const [isActive, setIsActive] = useState(false)
  const gltf = useGLTF('./libs/red_pokemon/scene.gltf')
  const ref = useRef()
  const model = {
    position: new THREE.Vector3(1, 0.1, 26),
    rotation: new THREE.Vector3(0, (6 * Math.PI) / 5, 0),
    options: {
      focusOnPosition: new THREE.Vector3(-2, 1.4, 26),
      animateToPosition: new THREE.Vector3(1, 2.4, 5),
      fov: 15,
    },
  }

  const [activateMesh] = useBox(() => ({
    args: [5, 5, 0.05],
    rotation: [-Math.PI / 2, 0, 0],
    position: [model.position.x, 0.001, model.position.z],
  }))

  useEffect(
    () => (page === 'about' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useEffect(() => {
    activateMesh.current.name = 'activitymesh.about'
  }, [])

  useModelTransition(isActive, model.options)

  return (
    <mesh>
      <BillboardHoarding
        position={[model.position.x - 3, 0, model.position.z + 1.2]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <Text
        color="#212121"
        position={[model.position.x - 3, 1.5, model.position.z + 1]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Connect
      </Text>
      <mesh ref={activateMesh} />
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
}

AshWithFriends.propTypes = {
  page: PropTypes.string,
}

useGLTF.preload('./libs/red_pokemon/scene.gltf')

export default AshWithFriends
