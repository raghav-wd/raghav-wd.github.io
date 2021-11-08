/* eslint-disable */
import React, { Suspense, useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
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
  const blendDuration = 0.4
  let panel, personGuiPanel, cameraGuiPanel

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

  const keys = { KeyW: "forward", KeyS: "backward", KeyA: "left", KeyD: "right", Space: "jump" }
  const moveFieldByKey = (key) => keys[key]

  const usePlayerControls = () => {
  const [movement, setMovement] = useState({ forward: false, backward: false, left: false, right: false, jump: false })
  useEffect(() => {
    const handleKeyDown = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }))
    const handleKeyUp = (e) => setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }))
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
  return movement
}
// Importing model
const Model = () => {
  const gltf = useGLTF('./libs/Xbot.glb', '/draco-gltf')
  const { ref, mixer, names, actions, clips } = useAnimations(gltf.animations)
  const { forward, backward, left, right, jump } = usePlayerControls()
  const velocity = useRef([0, 0, 0])

  frontVector.set(0, 0, Number(forward) - Number(backward))
  sideVector.set(Number(right) - Number(left), 0, 0)
  direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)

    const [mesh, api] = useSphere(() => ({
      mass: 1,
      position: [0, 1, 0],
      type: 'Dynamic',
    }))
    const [currentAction, setCurrentAction] = useState('idle')

    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])
    
    useEffect(() => {
      actions[currentAction]?.reset().fadeIn(blendDuration).play()
      return () => void actions[currentAction]?.fadeOut(blendDuration)
    }, [currentAction])

    useFrame(() => {
      api.velocity.set(0, 0, 1)
      mesh.current.getWorldPosition(ref.current.position)
      api.velocity.set(direction.x, velocity.current[1], direction.z)
      // if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) api.velocity.set(velocity.current[0], 20, velocity.current[2])
      ref.current.position.y -= 1
    })

    // useEffect(() => {
    //   document.addEventListener('keydown', function (event) {
    //     console.log(
    //       `Key: ${event.key} with keycode ${event.keyCode} has been pressed`
    //     )
    //     switch (event.key) {
    //       case 'w': {
    //         ref.current.position.z += 0.04
    //         setCurrentAction('walk')
    //         break
    //       }
    //       case 'a': {
    //         ref.current.position.x += 0.04
    //         break
    //       }
    //       case 's': {
    //         ref.current.position.z -= 0.04
    //         setCurrentAction('idle')
    //         break
    //       }
    //       case 'd': {
    //         ref.current.position.x -= 0.04
    //         break
    //       }
    //     }
    //   })

    //   if (personGuiPanel && personGuiPanel) {
    //     personGuiPanel
    //       .add(ref.current.position, 'x')
    //       .min(0)
    //       .max(5)
    //       .step(0.1)
    //       .name('x')
    //     personGuiPanel
    //       .add(ref.current.position, 'y')
    //       .min(0)
    //       .max(5)
    //       .step(0.1)
    //       .name('y')
    //     personGuiPanel
    //       .add(ref.current.position, 'z')
    //       .min(0)
    //       .max(5)
    //       .step(0.05)
    //       .name('z')
    //     personGuiPanel.add(ref.current, 'visible')
    //   }
    // }, [])

    return (
      <mesh>
        <mesh ref={mesh}></mesh>
        <primitive ref={ref} object={gltf.scene} dispose={null} />
      </mesh>
    )
  }

  function PersonCamera() {
    const ref = useRef()
    useEffect(() => {
      if (cameraGuiPanel) {
        cameraGuiPanel
          .add(ref.current.position, 'x')
          .min(0)
          .max(5)
          .step(0.1)
          .name('x')
        cameraGuiPanel
          .add(ref.current.position, 'y')
          .min(0)
          .max(5)
          .step(0.1)
          .name('y')
        cameraGuiPanel
          .add(ref.current.position, 'z')
          .min(-5)
          .max(5)
          .step(0.05)
          .name('z')
      }
    })
    return (
      <PerspectiveCamera
        fov={45}
        ref={ref}
        position={[0, 2, -5]}
        makeDefault // Registers it as the default camera system-wide (default=false)
      ></PerspectiveCamera>
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
      <PersonCamera />
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight />
      <axesHelper args={[5]} />
      {/* <Plane /> */}
      <Physics>
        <Debug>
          <Plane />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
        </Debug>
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
