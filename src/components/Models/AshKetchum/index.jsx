import PropTypes from 'prop-types'
import * as THREE from 'three'
import { useEffect, useState, useRef } from 'react'
import { useGLTF, Text, useAnimations, Shadow } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import BillboardHoarding from '../BillboardHoarding'
import { useModelTransition } from '../../hooks'

const AshKetchum = ({ page, setPage }) => {
  const [isActive, setIsActive] = useState(false)
  const ashShadow = useRef(null)
  const gltf = useGLTF('./libs/ash_ketchum/scene.gltf')
  const { ref, actions } = useAnimations(gltf.animations)

  const model = {
    blendDuration: 0.4,
    position: new THREE.Vector3(10, 0, 0),
    rotation: new THREE.Vector3(0, -Math.PI, 0),
    options: {
      focusOnPosition: new THREE.Vector3(10, 2, 2),
      animateToPosition: new THREE.Vector3(10, 2, -15),
      fov: 30,
    },
  }

  const [activateMesh] = useBox(() => ({
    args: [4, 4, 0.05],
    rotation: [-Math.PI / 2, 0, 0],
    position: [model.position.x, 0.001, model.position.z],
  }))

  useEffect(
    () => (page === 'rocknroll' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useEffect(() => {
    actions.laying_idle.play()
    activateMesh.current.name = 'activitymesh.rocknroll'
  }, [])

  useModelTransition(isActive, model.options)

  useEffect(() => {
    if (isActive) {
      actions.laying_idle.reset().fadeOut(model.blendDuration)
      actions.gangnam_style.play()
    }
  }, [isActive])

  return (
    <mesh>
      <BillboardHoarding
        position={[model.position.x, 0, model.position.z + 3]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <mesh ref={activateMesh} />
      <Text
        color="#212121"
        position={[model.position.x - 0.2, 1.5, model.position.z + 2.8]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Rock&apos;n Roll
      </Text>
      <mesh position={[model.position.x - 2, 0, model.position.z]}>
        <boxBufferGeometry args={[0.05, 0.05, 4]} />
        <meshStandardMaterial />
      </mesh>
      <primitive
        ref={ref}
        rotation={[...model.rotation]}
        position={[...model.position]}
        object={gltf.scene}
        dispose={null}
      />
      <Shadow
        ref={ashShadow}
        position={[...model.position]}
        rotation-x={-Math.PI / 2}
        scale={1}
        opacity={0.08}
      />
    </mesh>
  )
}

AshKetchum.defaultProps = {
  page: '',
  setPage: null,
}

AshKetchum.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
}

useGLTF.preload('./libs/ash_ketchum/scene.gltf')

export default AshKetchum
