import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane } from '@react-three/cannon'
import {
  Stats,
  Text,
  OrbitControls,
  Preload,
  BakeShadows,
} from '@react-three/drei'
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
} from '../Models'
import Pages from '../Pages'
import '../../App.css'

const Stage = () => {
  const [page, setPage] = useState('')
  const [isLost, setIsLost] = useState(false)

  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        mode="concurrent"
        frameloop="demand"
        camera={{ fov: 50, position: [0, 0.1, -10] }}
        style={{ height: '100vh', width: '100%' }}
      >
        <Suspense fallback={<Loader />}>
          <pointLight position={[-5, 10, -2]} intensity={2} />
          {/* <Stats showPanel={0} className="stats" /> */}
          {/* <OrbitControls target={[-8, 0, 16]} /> */}
          {/* <axesHelper args={[100]} /> */}
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
          <PokemonBadges />
          <SideProps />
          <Skybox />
          <Juice />
          <Piano />
          <LaprasInLake />
          <Projects />
          <Physics
            iterations={20}
            tolerance={0.0001}
            defaultContactMaterial={{
              friction: 0,
              restitution: 0.7,
              contactEquationStiffness: 1e7,
              contactEquationRelaxation: 1,
              frictionEquationStiffness: 1e7,
              frictionEquationRelaxation: 2,
            }}
            gravity={[0, -40, 0]}
          >
            <AshKetchum />
            <AshWithFriends page={page} setPage={setPage} />
            <HologramConsole page={page} setPage={setPage} />
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
        </Suspense>
      </Canvas>
      <Pages page={page} isLost={isLost} setIsLost={setIsLost} />
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
