/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useSpring, a } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF, Shadow } from '@react-three/drei'
import { useSphere } from '@react-three/cannon'
import { usePersonControls } from '../../hooks'
import { useStore } from '../../../store'

// Importing Person
const Person = ({ page, setPage }) => {
  const gltf = useGLTF('./libs/pikachu2.glb', true)
  const { ref: personRef, actions } = useAnimations(gltf.animations)
  const [selectedAction, setSelectedAction] = useState('Idle')
  const [drop, setDrop] = useState([0, 3, 0])
  const audioChannel = useRef(null)
  const movement = useStore((state) => state.movement)

  const direction = new THREE.Vector3()
  const frontVector = new THREE.Vector3()
  const sideVector = new THREE.Vector3()
  const velocity = useRef([0, 0, 0])

  const personShadowRef = useRef(null)

  const { camera } = useThree()
  const { forward, backward, left, right, dance, reset, jump } = movement

  const model = {
    blendDuration: 0.25,
    speed: 3,
  }

  usePersonControls()

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

  useEffect(() => {
    if (actions[selectedAction])
      actions[selectedAction].reset().fadeIn(model.blendDuration).play()

    return () => {
      if (actions[selectedAction])
        actions[selectedAction].fadeOut(model.blendDuration)
    }
  }, [actions, selectedAction])

  const [personMesh, personApi] = useSphere(() => ({
    args: [0.34],
    mass: 1,
    position: [0, 1.01, 0],
    type: 'Dynamic',
    onCollideBegin: (e) => {
      try {
        const currentlyActiveMesh = e.body.name.split('.')
        if (currentlyActiveMesh[0] !== 'activitymesh') return
        if (currentlyActiveMesh[1] === 'ground') setPage('')
        else setPage(currentlyActiveMesh[1])
      } catch (exp) {
        // Empty
      }
    },
  }))

  useEffect(() => {
    if (page === 'game') personApi.position.set(-9, 0, 21)
  }, [page])

  // Person movement animation ...
  useEffect(() => {
    personMesh.current.name = 'Pikachu'

    // animation clips for movement ...
    if (forward || right || left || backward) {
      setSelectedAction('Walking')
    }
    return () => {
      if (forward || right || left || backward) {
        setSelectedAction('Idle')
      }
    }
  }, [forward, backward, right, left, jump])

  useEffect(() => {
    if (jump && audioChannel.current.paused) {
      const audioChannelSrc = `./audios/pikachu/${
        Math.round(Math.random() * 8) + 1
      }.mp3`
      audioChannel.current.volume = 0.2
      audioChannel.current.src = audioChannelSrc
      audioChannel.current.play()
      setSelectedAction('Jump')
    } else if (dance) {
      const musicSrc = './audios/rickroll.mp3'
      audioChannel.current.volume = 0.5
      audioChannel.current.src = musicSrc
      audioChannel.current.play()
      setSelectedAction('Dance')
    }
    return () => {
      if (jump) setSelectedAction('Idle')
      else if (dance) {
        audioChannel.current.pause()
        setSelectedAction('Idle')
      }
    }
  }, [jump, dance])

  useEffect(() => {
    if (reset) personApi.position.set(0, 0.05, 0)
    setPage('')
  }, [reset])

  const dropSpring = useSpring({
    position: drop,
    config: { mass: 1, tension: 180, friction: 40 },
  })

  useEffect(() => {
    audioChannel.current = new Audio()
    camera.position.set(0, 2, -6)
    camera.lookAt(0, 1, 0)
    personApi.velocity.subscribe((v) => {
      velocity.current = v
      return velocity.current
    })
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setDrop([0, 0, 0]), 1000)
    return () => clearTimeout(timeout)
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
    personShadowRef.current.position.y = 0.0005
    personShadowRef.current.position.z = personRef.current.position.z
    personApi.velocity.set(direction.x, velocity.current[1], direction.z)

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
    <a.mesh {...dropSpring}>
      <mesh ref={personMesh} />
      <primitive
        scale={0.6}
        ref={personRef}
        object={gltf.scene}
        dispose={null}
      />
      <Shadow
        opacity={0.15}
        ref={personShadowRef}
        scale={0.6}
        rotation-x={-Math.PI / 2}
      />
    </a.mesh>
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

useGLTF.preload('./libs/Pikachu.glb')

export default Person
