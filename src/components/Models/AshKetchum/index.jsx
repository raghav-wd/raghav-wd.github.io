import * as THREE from 'three'
import { useEffect, useState, useRef } from 'react'
import { useGLTF, Text, useAnimations, Shadow } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import BillboardHoarding from '../BillboardHoarding'

const AshKetchum = () => {
  const [isActive, setIsActive] = useState(false)
  const ashShadow = useRef(null)
  const gltf = useGLTF('./libs/ash_ketchum/scene.gltf')
  const { ref, actions } = useAnimations(gltf.animations)

  const model = {
    blendDuration: 0.4,
    position: new THREE.Vector3(10, 0, 2),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
  }

  const [activateMesh] = useBox(() => ({
    args: [4, 4, 0.0002],
    rotation: [-Math.PI / 2, 0, 0],
    position: [...model.position],
    onCollide: (e) => {
      if (e.body.name === 'Pikachu') {
        setIsActive(true)
      }
    },
  }))

  useEffect(() => {
    actions.laying_idle.play()
    activateMesh.current.name = 'Ash actmesh'
  }, [])

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

export default AshKetchum
