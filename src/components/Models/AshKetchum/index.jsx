import * as THREE from 'three'
import { useEffect, useState } from 'react'
import { useGLTF, Text, useAnimations } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import BillboardHoarding from '../BillboardHoarding'

const AshKetchum = () => {
  const [isActive, setIsActive] = useState(false)
  const gltf = useGLTF('./libs/ash_ketchum/scene.gltf')
  const { ref, actions } = useAnimations(gltf.animations)

  const model = {
    blendDuration: 0.4,
    position: new THREE.Vector3(10, 0, 2),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
  }

  const collisionHandler = () => {
    setIsActive(true)
  }

  const collisionHandlerLeave = () => {
    setIsActive(false)
  }

  const [mesh] = useBox(() => ({
    args: [4, 4, 0.0002],
    rotation: [-Math.PI / 2, 0, 0],
    position: [...model.position],
    onCollide: collisionHandler,
  }))

  const [outerPlane] = useBox(() => ({
    args: [1, 1, 0.0001],
    rotation: [-Math.PI / 2, 0, 0],
    position: [model.position.x - 2, model.position.y, model.position.z],
    onCollide: collisionHandlerLeave,
  }))

  useEffect(() => {
    actions.laying_idle.play()
  }, [])

  useEffect(() => {
    if (isActive) {
      actions.laying_idle.reset().fadeOut(model.blendDuration)
      actions.gangnam_style.play()
    }
    // else {
    //   actions.gangnam_style.reset().fadeOut(model.blendDuration)
    //   actions.laying_idle.play()
    // }
  }, [isActive])

  return (
    <mesh>
      {/* <mesh position={[...model.position]} rotation={[...model.rotation]}>
        <boxBufferGeometry args={[3.6, 0.01, 3.6]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh> */}
      <BillboardHoarding
        position={[model.position.x, 0, model.position.z + 2]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <mesh ref={mesh} />
      <mesh ref={outerPlane} />
      <Text
        color="#212121"
        position={[model.position.x - 0.2, 1.5, model.position.z + 1.8]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Rock&apos;n Roll
      </Text>
      <primitive
        ref={ref}
        rotation={[...model.rotation]}
        position={[...model.position]}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default AshKetchum
