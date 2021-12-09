import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Physics, usePlane } from '@react-three/cannon'
import { Stats, OrbitControls, Preload, AdaptiveDpr } from '@react-three/drei'
import {
  AshKetchum,
  AshWithFriends,
  Charizard,
  HologramConsole,
  Juice,
  LaprasInLake,
  Loader,
  Person,
  Piano,
  Projects,
  PokemonBadges,
  SideProps,
  Skybox,
  Oddish,
} from '../Models'
import Pages from '../Pages'
import '../../App.css'

const Stage = () => {
  const [page, setPage] = useState('')
  const [isLost, setIsLost] = useState(false)

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Canvas
          dpr={[1, 2]}
          mode="concurrent"
          frameloop="demand"
          onCreated={({ gl }) => {
            // eslint-disable-next-line no-param-reassign
            gl.toneMapping = THREE.CineonToneMapping
          }}
          performance={{ min: 0.5 }}
          camera={{ fov: 50, position: [0, 0.1, -10] }}
          style={{ height: '100vh', width: '100%' }}
        >
          <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
          <ambientLight />
          {/* <Stats showPanel={0} className="stats" /> */}
          {/* <OrbitControls target={[-8, 0, 16]} /> */}
          {/* <axesHelper args={[100]} /> */}
          <fog attach="fog" args={['#ddddff', 0, 120]} />
          <PokemonBadges />
          <SideProps />
          <Skybox />
          <Juice />
          <Piano />
          <Oddish />
          <LaprasInLake />
          <Projects />
          <Physics iterations={20} tolerance={0.0001} gravity={[0, -40, 0]}>
            <AshKetchum page={page} />
            <AshWithFriends page={page} />
            <HologramConsole page={page} />
            <Charizard
              page={page}
              setPage={setPage}
              isLost={isLost}
              setIsLost={setIsLost}
            />
            <Person page={page} setPage={setPage} />
            <Plane />
          </Physics>
          <Preload all />
          <AdaptiveDpr />
        </Canvas>
      </Suspense>
      <Pages page={page} isLost={isLost} setIsLost={setIsLost} />
    </div>
  )
}

function Plane(props) {
  // This reference will give us direct access to the mesh
  const [mesh] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  useEffect(() => {
    mesh.current.name = 'activitymesh.ground'
  }, [])
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[140, 140]} />
      <meshBasicMaterial color="#cddc39" />
    </mesh>
  )
}

export default Stage
