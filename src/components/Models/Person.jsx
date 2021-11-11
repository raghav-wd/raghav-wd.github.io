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
} from '@react-three/cannon'
import {
  useGLTF,
  useAnimations,
  Sky,
  PointerLockControls,
  Shadow,
  Stats,
} from '@react-three/drei'
import { GUI } from 'dat.gui'

const Person = () => {
  const blendDuration = 0.15
  let panel, personGuiPanel, cameraGuiPanel

  const SPEED = 3
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
  const SunsetGirl = (props) => {
    const gltf = useGLTF(
      './libs/sunset_walking_low_poly_girl_rigged/scene.gltf'
    )

    return (
      <primitive
        {...props}
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 0.001, 20]}
        scale={0.8}
        object={gltf.scene}
        dispose={null}
      />
    )
  }

  // Importing model
  const Model = () => {
    const gltf = useGLTF('./libs/Pikachu.glb', true)
    const { ref, mixer, names, actions, clips } = useAnimations(gltf.animations)
    const { forward, backward, left, right, jump } = usePlayerControls()
    const { camera, mouse } = useThree()
    const velocity = useRef([0, 0, 0])

    const personShadowRef = useRef(null)

    const [mesh, api] = useSphere(() => ({
      mass: 10,
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

      if (forward || right || left || backward) {
        actions['Happy Idle'].reset().fadeOut(blendDuration)
        actions['Walking'].reset().fadeIn(blendDuration).play()
      }
      return () => {
        if (forward || right || left || backward) {
          actions['Happy Idle'].reset().fadeIn(blendDuration).play()
          actions['Walking'].reset().fadeOut(blendDuration)
        }
      }
    }, [forward, backward, right, left, jump])

    useEffect(() => {
      actions['Happy Idle'].play()
      camera.position.set(0, 2, -6)
      camera.lookAt(0, 1, 0)
      api.velocity.subscribe((v) => (velocity.current = v))
    }, [])

    useFrame(() => {
      mesh.current.getWorldPosition(camera.position)
      camera.position.z -= 6
      camera.position.y = 2
      mesh.current.getWorldPosition(ref.current.position)
      personShadowRef.current.position.x = ref.current.position.x
      personShadowRef.current.position.z = ref.current.position.z
      api.velocity.set(direction.x, velocity.current[1], direction.z)
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        rotateModelWithMovement(),
        0.2
      )
      ref.current.position.y -= 1
    })

    const rotateModelWithMovement = () => {
      let rotation = 0
      if (!((forward || backward) && (left || right))) {
        if (forward) rotation = 0
        else if (backward) rotation = Math.PI
        else if (left) rotation = Math.PI / 2
        else if (right) rotation = -Math.PI / 2
      } else {
        if (forward && left) rotation = Math.PI / 4
        else if (forward && right) rotation = -Math.PI / 4
        else if (backward && left) rotation = (3 * Math.PI) / 4
        else if (backward && right) rotation = -(3 * Math.PI) / 4
      }
      return rotation
    }

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
        <primitive scale={0.6} ref={ref} object={gltf.scene} dispose={null} />
        <Shadow
          ref={personShadowRef}
          scale={[0.5, 0.5, 0.5]}
          position-y={0.01}
          rotation-x={-Math.PI / 2}
        />
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
      <Sky
        distance={450000} // Camera distance (default=450000)
        sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
        inclination={0} // Sun elevation angle from 0 to 1 (default=0)
        azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        // {...props} // All three-stdlib/objects/Sky props are valid
      />
      {/* <fog attach="fog" args={['#cc7b32', 0, 34]} /> */}
      {/* <PointerLockControls maxPolarAngle={Math.PI/2} minPolarAngle={Math.PI/5} args/> */}
      {/* <OrbitControls ref={orbitcontrols} makeDefault target={[0, 1, 0]} makeDefault/> */}
      <ambientLight />
      <axesHelper args={[100]} />
      <pointLight position={[-5, 10, -2]} intensity={2} />
      {/* <Rig/> */}
      <Suspense fallback={null}>
        <SunsetGirl />
      </Suspense>
      <Suspense fallback={null}>
        <Tree position={[2, 0, 0]} />
      </Suspense>
      <Suspense fallback={null}>
        <JuiceCup />
      </Suspense>
      <Suspense fallback={null}>
        <Piano />
      </Suspense>
      <Physics>
        {/* <Debug> */}
        <Plane />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        {/* </Debug> */}
      </Physics>
    </Canvas>
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

export default Person
