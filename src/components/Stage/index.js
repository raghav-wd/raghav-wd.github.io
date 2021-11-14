/* eslint-disable */
import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox, Debug } from '@react-three/cannon'
import { useGLTF, Sky, Stats, PerspectiveCamera } from '@react-three/drei'
import {
  Person,
  SunsetGirl,
  SpruceTree,
  HologramConsole,
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

  const Piano = (props) => {
    const gltf = useGLTF('./libs/piano/scene.gltf')

    return (
      <primitive
        {...props}
        rotation={[0, -Math.PI / 2, 0]}
        position={[4, 0.2, 7]}
        object={gltf.scene}
        dispose={null}
      />
    )
  }

  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45 }}
        style={{ height: '100vh', width: '100%' }}
      >
        <Stats
          showPanel={0} // Start-up panel (default=0)
          className="stats" // Optional className to add to the stats container dom element
        />
        <Sky
          distance={450000} // Camera distance (default=450000)
          sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
          inclination={0} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          // {...props} // All three-stdlib/objects/Sky props are valid
        />
        <ambientLight />
        <axesHelper args={[100]} />
        <pointLight position={[-5, 10, -2]} intensity={2} />
        {/* <Suspense fallback={null}>
        <SunsetGirl />
      </Suspense>
      <Suspense fallback={null}>
        <Tree position={[2, 0, 0]} />
      </Suspense>
      <Suspense fallback={null}>
        <JuiceCup />
      </Suspense>
      <Suspense fallback={null}>
        <SpruceTree />
      </Suspense>
      <Suspense fallback={null}>
        <Piano />
      </Suspense> */}
        <Physics>
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
      <planeBufferGeometry args={[100, 100]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default Stage
