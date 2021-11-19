import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF, Shadow } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { usePersonControls } from '../../hooks'

// Importing Person
// eslint-disable-next-line react/prop-types
const Person = ({ page, setPage }) => {
  const blendDuration = 0.15
  const { camera } = useThree()

  const SPEED = 3
  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  // const rotation = new THREE.Vector3()
  const speed = new THREE.Vector3()

  const gltf = useGLTF('./libs/Pikachu.glb', true)
  const { ref, mixer, names, actions, clips } = useAnimations(gltf.animations)
  const { forward, backward, left, right, jump } = usePersonControls()
  const velocity = useRef([0, 0, 0])

  const personShadowRef = useRef(null)

  const rotatePersonWithMovement = () => {
    let rotation = 0
    if (!((forward || backward) && (left || right))) {
      if (forward) rotation = 0
      else if (backward) rotation = Math.PI
      else if (left) rotation = Math.PI / 2
      else if (right) rotation = -Math.PI / 2
    } else {
      // eslint-disable-next-line no-lonely-if
      if (forward && left) rotation = Math.PI / 4
      else if (forward && right) rotation = -Math.PI / 4
      else if (backward && left) rotation = (3 * Math.PI) / 4
      else if (backward && right) rotation = -(3 * Math.PI) / 4
    }
    return rotation
  }

  const [mesh, api] = useSphere(() => ({
    mass: 10,
    position: [0, 1, 0],
    type: 'Dynamic',
  }))

  // Person movement animation ...
  useEffect(() => {
    if (page !== '') {
      // Detects person out of view ...
      const frustum = new THREE.Frustum()
      const matrix = new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
      frustum.setFromProjectionMatrix(matrix)
      if (!frustum.containsPoint(ref.current.position)) {
        setPage('')
      }
    }

    // animation clips for movement ...
    if (forward || right || left || backward) {
      actions['Happy Idle'].reset().fadeOut(blendDuration)
      actions.Walking.reset().fadeIn(blendDuration).play()
    }
    return () => {
      if (forward || right || left || backward) {
        actions['Happy Idle'].reset().fadeIn(blendDuration).play()
        actions.Walking.reset().fadeOut(blendDuration)
      }
    }
  }, [forward, backward, right, left, jump])

  useEffect(() => {
    actions['Happy Idle'].play()
    camera.position.set(0, 2, -6)
    camera.lookAt(0, 1, 0)
    // eslint-disable-next-line no-return-assign
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [])

  useFrame(() => {
    // Calculating front/side movement ...
    frontVector.set(0, 0, Number(forward) - Number(backward))
    sideVector.set(Number(right) - Number(left), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)

    // Person shadow ...
    personShadowRef.current.position.x = ref.current.position.x
    personShadowRef.current.position.z = ref.current.position.z
    api.velocity.set(direction.x, velocity.current[1], direction.z)

    // Adding lerp rotation to person model ...
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      rotatePersonWithMovement(),
      0.2
    )

    // Setting person model position to sphere body position ...
    mesh.current.getWorldPosition(ref.current.position)
    ref.current.position.y -= 1
    if (page === '') {
      // Setting camera position to sphere body position ...
      mesh.current.getWorldPosition(camera.position)
      camera.position.z -= 6
      camera.position.y = 2
      camera.lookAt(ref.current.position)
      camera.fov = 45
      camera.updateMatrix()
      camera.updateMatrixWorld()
      camera.updateWorldMatrix()
      camera.updateProjectionMatrix()
    }
  })

  return (
    <mesh>
      <mesh ref={mesh} />
      {/* <pointLight position={[1, 1, 1]} intensity={0.2} />
      <pointLight position={[1, 1, -1]} intensity={0.2} />
      <pointLight position={[-1, 1, 1]} intensity={0.2} />
      <pointLight position={[-1, 1, -1]} intensity={0.2} /> */}
      <primitive scale={0.6} ref={ref} object={gltf.scene} dispose={null} />
      <Shadow
        ref={personShadowRef}
        position-Y={0.01}
        scale={[0.5, 0.5, 0.5]}
        rotation-x={-Math.PI / 2}
      />
    </mesh>
  )
}

export default Person
