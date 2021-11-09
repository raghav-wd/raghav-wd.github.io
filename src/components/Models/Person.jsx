/* eslint-disable */
import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Physics,
  useSphere,
  usePlane,
  useBox,
  Debug,
  useCylinder,
} from '@react-three/cannon'
import {
  useGLTF,
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  Stats,
} from '@react-three/drei'
import { GUI } from 'dat.gui'

const Person = () => {
  const blendDuration = 0.15
  let panel, personGuiPanel, cameraGuiPanel
  const [currentAction, setCurrentAction] = useState('walk')

  const SPEED = 5
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const rotation = new THREE.Vector3()
  const speed = new THREE.Vector3()

  useEffect(() => {
    panel = new GUI()
    personGuiPanel = panel.addFolder('Person')
    cameraGuiPanel = panel.addFolder('Camera')
  }, [])

  const keys = {
    KeyW: 'forward',
    KeyS: 'backward',
    KeyA: 'left',
    KeyD: 'right',
    Space: 'jump',
  }
  const moveFieldByKey = (key) => keys[key]

  const usePlayerControls = () => {
    const [movement, setMovement] = useState({
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false,
    })
    useEffect(() => {
      const handleKeyDown = (e) => {
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
      }
      const handleKeyUp = (e) => {
        setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
      }
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keyup', handleKeyUp)
      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
      }
    }, [])
    return movement
  }

  // Importing model
  const Model = () => {
    const gltf = useGLTF('./libs/Xbot.glb', '/draco-gltf')
    const { ref, mixer, names, actions, clips } = useAnimations(gltf.animations)
    const { forward, backward, left, right, jump } = usePlayerControls()
    const personCameraRef = useRef(null)
    const { camera } = useThree()
    const velocity = useRef([0, 0, 0])

    const [mesh, api] = useSphere(() => ({
      mass: 1,
      position: [0, 1, 0],
      type: 'Dynamic',
    }))

    useEffect(() => {
      frontVector.set(0, 0, Number(forward) - Number(backward))
      sideVector.set(Number(right) - Number(left), 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)

      if (forward || right || left) {
        actions.idle.reset().fadeOut(blendDuration)
        actions.walk.reset().fadeIn(blendDuration).play()
      }
      return () => {
        if (forward || right || left) {
          actions.idle.reset().fadeIn(blendDuration).play()
          actions.walk.reset().fadeOut(blendDuration)
        }
      }
    }, [forward, backward, right, left])

    useEffect(() => {
      actions.idle.play()
      camera.position.set(0, 1.45, -4.25)
      camera.lookAt(0, 1.45, 0)
      api.velocity.subscribe((v) => (velocity.current = v))
    }, [])

    useFrame(() => {
      mesh.current.getWorldPosition(camera.position)
      mesh.current.getWorldPosition(ref.current.position)
      camera.position.z -= 4
      api.velocity.set(direction.x, velocity.current[1], direction.z)
      ref.current.position.y -= 1
    })

    useEffect(() => {
      if (personGuiPanel && personGuiPanel) {
        personGuiPanel
          .add(ref.current.position, 'x')
          .min(0)
          .max(5)
          .step(0.1)
          .name('x')
        personGuiPanel
          .add(ref.current.position, 'y')
          .min(0)
          .max(5)
          .step(0.1)
          .name('y')
        personGuiPanel
          .add(ref.current.position, 'z')
          .min(0)
          .max(5)
          .step(0.05)
          .name('z')
        personGuiPanel.add(ref.current, 'visible')
      }
    }, [])

    return (
      <mesh>
        <mesh ref={mesh}></mesh>
        <primitive ref={ref} object={gltf.scene} dispose={null} />
      </mesh>
    )
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45 }}
      style={{ height: '100vh', width: '100%' }}
    >
      <Stats
        showPanel={0} // Start-up panel (default=0)
        className="stats" // Optional className to add to the stats container dom element
      />
      <ambientLight />
      <axesHelper args={[100]} />
      <Physics>
        <Plane />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Physics>
    </Canvas>
  )
}

function Plane(props) {
  // This reference will give us direct access to the mesh
  const [mesh] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  // console.log(mesh.current.x)
  return (
    <mesh ref={mesh} {...props} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default Person
