import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF, Shadow } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { usePersonControls } from '../../hooks'

// Importing Person
const Person = ({ page, setPage }) => {
  const gltf = useGLTF('./libs/Pikachu.glb', true)
  const { ref: personRef, actions } = useAnimations(gltf.animations)

  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const velocity = useRef([0, 0, 0])

  const personShadowRef = useRef(null)
  const { camera } = useThree()
  const { forward, backward, left, right, jump } = usePersonControls()

  const model = {
    blendDuration: 0.15,
    speed: 3,
  }

  const rotatePersonWithMovement = () => {
    let rotation = 0
    if (!((forward || backward) && (left || right))) {
      if (forward) rotation = 0
      else if (backward) rotation = Math.PI
      else if (left) rotation = Math.PI / 2
      else if (right) rotation = -Math.PI / 2
    } else if (forward && left) rotation = Math.PI / 4
    else if (forward && right) rotation = -Math.PI / 4
    else if (backward && left) rotation = (3 * Math.PI) / 4
    else if (backward && right) rotation = -(3 * Math.PI) / 4
    return rotation
  }

  const [personMesh, api] = useBox(() => ({
    args: [0.34, 0.34, 0.34],
    mass: 1,
    position: [0, 1.01, 0],
    type: 'Dynamic',
  }))

  // Person movement animation ...
  useEffect(() => {
    personMesh.current.name = 'Pikachu'
    if (page !== '') {
      // Detects person out of view ...
      const frustum = new THREE.Frustum()
      const matrix = new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
      frustum.setFromProjectionMatrix(matrix)
      if (!frustum.containsPoint(personRef.current.position)) {
        setPage('')
      }
    }

    // animation clips for movement ...
    if (forward || right || left || backward) {
      actions['Happy Idle'].reset().fadeOut(model.blendDuration)
      actions.Walking.reset().fadeIn(model.blendDuration).play()
    }
    return () => {
      if (forward || right || left || backward) {
        actions['Happy Idle'].reset().fadeIn(model.blendDuration).play()
        actions.Walking.reset().fadeOut(model.blendDuration)
      }
    }
  }, [forward, backward, right, left, jump])

  useEffect(() => {
    actions['Happy Idle'].play()
    camera.position.set(0, 2, -6)
    camera.lookAt(0, 1, 0)
    api.velocity.subscribe((v) => {
      velocity.current = v
      return velocity.current
    })
  }, [])

  useFrame(() => {
    // Calculating front/side movement ...
    frontVector.set(0, 0, Number(forward) - Number(backward))
    sideVector.set(Number(right) - Number(left), 0, 0)
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(model.speed)

    // Person shadow ...
    personShadowRef.current.position.x = personRef.current.position.x
    personShadowRef.current.position.z = personRef.current.position.z
    api.velocity.set(direction.x, velocity.current[1], direction.z)

    // Adding lerp rotation to person model ...
    personRef.current.rotation.y = THREE.MathUtils.lerp(
      personRef.current.rotation.y,
      rotatePersonWithMovement(),
      0.2
    )

    // Setting person model position to sphere body position ...
    personMesh.current.getWorldPosition(personRef.current.position)
    personRef.current.position.y = 0
    if (page === '') {
      // Setting camera position to sphere body position ...
      personMesh.current.getWorldPosition(camera.position)
      camera.position.z -= 6
      camera.position.y = 2
      camera.lookAt(
        personRef.current.position.x,
        0.6,
        personRef.current.position.z
      )
      camera.fov = 37
      camera.updateMatrix()
      camera.updateMatrixWorld()
      camera.updateWorldMatrix()
      camera.updateProjectionMatrix()
    }
  })

  return (
    <mesh>
      <mesh ref={personMesh} />
      <primitive
        scale={0.6}
        ref={personRef}
        object={gltf.scene}
        dispose={null}
      />
      <Shadow
        ref={personShadowRef}
        position-Y={0.01}
        scale={[0.5, 0.5, 0.5]}
        rotation-x={-Math.PI / 2}
      />
    </mesh>
  )
}

Person.defaultProps = {
  page: '',
  setPage: null,
}

Person.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
}

export default Person
