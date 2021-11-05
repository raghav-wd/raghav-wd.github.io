/* eslint-disable */
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  OrbitControls,
  useAnimations,
  PerspectiveCamera,
  Stats,
} from '@react-three/drei'
import { GUI } from 'dat.gui'

const Person = () => {
  let panel, personGuiPanel
  const camera = useRef()

  useEffect(() => {
    panel = new GUI()
    personGuiPanel = panel.addFolder('Person')
  }, [])

  // Importing model
  const Model = () => {
    const gltf = useGLTF('./libs/Xbot.glb', '/draco-gltf')
    const { ref, mixer, names, actions, clips } = useAnimations(gltf.animations)

    // console.log(gltf.scene)
    useEffect(() => {
      // console.log(ref)
      document.addEventListener('keydown', function (event) {
        console.log(
          `Key: ${event.key} with keycode ${event.keyCode} has been pressed`
        )
        switch (event.key) {
          case 'w': {
            ref.current.position.z += 0.04
            break
          }
          case 'a': {
            ref.current.position.x += 0.04
            break
          }
          case 's': {
            ref.current.position.z -= 0.04
            break
          }
          case 'd': {
            ref.current.position.x -= 0.04
            break
          }
        }
      })
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
      actions.walk.play()
    })
    return <primitive ref={ref} object={gltf.scene} dispose={null} />
  }

  function PersonCamera() {
    const ref = useRef()
    useEffect(() => {
      let cameraGuiPanel = panel.addFolder('Camera')
      console.log(ref.current)
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
    })
    return (
      <PerspectiveCamera
        fov={45}
        ref={ref}
        position={[0, 2, -5]}
        makeDefault // Registers it as the default camera system-wide (default=false)
        // {...props} // All THREE.PerspectiveCamera props are valid
      ></PerspectiveCamera>
    )
  }

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 45 }}
      style={{ height: '100vh', width: '100%' }}
      onKeyDown={() => console.log('hi')}
    >
      <Stats
        showPanel={0} // Start-up panel (default=0)
        className="stats" // Optional className to add to the stats container dom element
      />
      <PersonCamera />
      <OrbitControls enablePan enableZoom enableRotate />
      <ambientLight />
      <axesHelper args={[5]} />
      <Plane />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  )
}

function Plane(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // console.log(mesh.current.x)
  return (
    <mesh {...props} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry ref={mesh} args={[100, 100]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default Person
