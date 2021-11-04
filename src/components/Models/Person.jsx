/* eslint-disable */
import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  useGLTF,
  OrbitControls,
  useAnimations,
  Billboard,
  Stats,
} from '@react-three/drei'
import { GUI } from 'dat.gui'

const Person = () => {
  let panel, personGuiPanel
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
      console.log(ref)
      personGuiPanel
        .add(ref.current.position, 'x')
        .min(0)
        .max(5)
        .step(0.1)
        .name('x')
      personGuiPanel.add(ref.current, 'visible')
      actions.walk.play()
    })
    return <primitive ref={ref} object={gltf.scene} dispose={null} />
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
