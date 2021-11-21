/* eslint-disable */
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Physics, usePlane, useBox, Debug } from '@react-three/cannon'
import {
  useGLTF,
  Sky,
  Stats,
  PerspectiveCamera,
  Text,
  Center,
  QuadraticBezierLine,
  OrbitControls,
} from '@react-three/drei'
import {
  Person,
  SunsetGirl,
  SpruceTree,
  HologramConsole,
  Skybox,
  Trees,
  AshKetchum,
  AshWithFriends,
  LaprasInLake,
  Snorlax,
  Juice,
  Piano,
} from '../Models/index.jsx'
import Pages from '../Pages'
import '../../App.css'

const Stage = () => {
  const pages = { skill: 'skills', hobbies: 'hobbies' }
  const [page, setPage] = useState('')

  const Tree = (props) => {
    const gltf = useGLTF('./libs/stylized_tree/scene.gltf')

    return (
      <primitive
        {...props}
        scale={[0.01, 0.01, 0.01]}
        object={gltf.scene}
        dispose={null}
      />
    )
  }

  const JuiceCup = (props) => {
    const gltf = useGLTF('./libs/low_poly_stylized_juice_cup/scene.gltf')

    return (
      <primitive
        {...props}
        position={[4, 1, 4]}
        object={gltf.scene}
        dispose={null}
      />
    )
  }

  // const Piano = (props) => {
  //   const gltf = useGLTF('./libs/piano/scene.gltf')

  //   return (
  //     <primitive
  //       {...props}
  //       rotation={[0, -Math.PI / 2, 0]}
  //       position={[4, 0.2, 7]}
  //       object={gltf.scene}
  //       dispose={null}
  //     />
  //   )
  // }

  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0.1, -10] }}
        style={{ height: '100vh', width: '100%' }}
      >
        <Stats
          showPanel={0} // Start-up panel (default=0)
          className="stats" // Optional className to add to the stats container dom element
        />
        {/* <OrbitControls target={[10, 0.2, 20]} /> */}
        <fog attach="fog" args={['#ddddff', 0, 120]} />
        <Text
          color="white"
          position={[0, 0.001, -2]}
          fontSize={0.2}
          letterSpacing={0.2}
          // strokeWidth={1}
          // strokeColor="white"
          fillOpacity={0}
          outlineColor="white"
          outlineWidth={0.01}
          rotation={[Math.PI / 2, Math.PI, 0]}
        >
          Let's Go!
        </Text>
        <QuadraticBezierLine
          start={[0, 0, 0]} // Starting point
          end={[-10, 0, 10]} // Ending point
          mid={[-8, 0, 2]} // Optional control point
          // segments={15}
          color="white" // Default
          lineWidth={4} // In pixels (default)
          dashed
        />
        <ambientLight />
        <axesHelper args={[100]} />
        <pointLight position={[-5, 10, -2]} intensity={2} />
        <Suspense fallback={null}>
          <Trees />
        </Suspense>
        <Suspense fallback={null}>
          <Skybox />
        </Suspense>
        <Suspense fallback={null}>
          <AshKetchum />
        </Suspense>
        <Suspense fallback={null}>
          <Juice />
        </Suspense>
        <Suspense fallback={null}>
          <Piano />
        </Suspense>
        <Suspense fallback={null}>
          <LaprasInLake />
        </Suspense>
        <Physics>
          <Suspense fallback={null}>
            <AshWithFriends page={page} setPage={setPage} />
          </Suspense>
          <Suspense fallback={null}>
            <HologramConsole page={page} setPage={setPage} />
          </Suspense>
          <Plane />
          <Suspense fallback={null}>
            <Person page={page} setPage={setPage} />
          </Suspense>
        </Physics>
      </Canvas>
      <Pages page={page} />
    </div>
  )
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  return (
    <mesh ref={ref}>
      <boxGeometry />
    </mesh>
  )
}

function Plane(props) {
  // This reference will give us direct access to the mesh
  const [mesh] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  // console.log(mesh.current.x)
  return (
    <mesh ref={mesh} {...props} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[140, 140]} />
      <meshBasicMaterial color="#cddc39" />
    </mesh>
  )
}

export default Stage
