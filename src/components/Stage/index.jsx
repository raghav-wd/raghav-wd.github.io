import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane } from '@react-three/cannon'
import { Stats, Text, OrbitControls } from '@react-three/drei'
import {
  Person,
  HologramConsole,
  Skybox,
  Trees,
  AshKetchum,
  AshWithFriends,
  LaprasInLake,
  Juice,
  Piano,
  Charizard,
  PokemonBadges,
} from '../Models'
import Pages from '../Pages'
import '../../App.css'

const Stage = () => {
  const pages = { skill: 'skills', hobbies: 'hobbies' }
  const [page, setPage] = useState('')

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
          fillOpacity={0}
          outlineColor="white"
          outlineWidth={0.01}
          rotation={[Math.PI / 2, Math.PI, 0]}
        >
          Let&apos;s Go!
        </Text>
        <ambientLight />
        <axesHelper args={[100]} />
        <pointLight position={[-5, 10, -2]} intensity={2} />
        <Suspense fallback={null}>
          <Trees />
          <Skybox />
          <Juice />
          <Piano />
          <LaprasInLake />
          <Charizard />
          {/* <PokemonBadges /> */}
        </Suspense>
        <Physics>
          <Suspense fallback={null}>
            <AshKetchum />
            <AshWithFriends page={page} setPage={setPage} />
            <HologramConsole page={page} setPage={setPage} />
            <Person page={page} setPage={setPage} />
          </Suspense>
          <Plane />
        </Physics>
      </Canvas>
      {/* <Pages page={page} /> */}
    </div>
  )
}

function Plane(props) {
  // This reference will give us direct access to the mesh
  const [mesh] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry args={[140, 140]} />
      <meshBasicMaterial color="#cddc39" />
    </mesh>
  )
}

export default Stage
