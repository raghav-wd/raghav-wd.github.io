/* eslint-disable */
import PropTypes from 'prop-types'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Shadow, Text, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Debug, useBox, useSphere } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'

const Charizard = ({ page, setPage, setIsLost }) => {
  const [isActive, setIsActive] = useState(false)

  const gltf = useGLTF('./libs/charizard/scene.gltf')

  const model = {
    position: new THREE.Vector3(-6, 0, 20),
    rotation: new THREE.Vector3(0, -Math.PI, 0),
    options: {
      focusOnPosition: new THREE.Vector3(-6, 0.4, 20),
      animateToPosition: new THREE.Vector3(-6, 2, 5),
      fov: 35,
    },
  }

  const game = {
    playArea: new THREE.Vector3(11, 0, 11),
    laneGap: 1,
    lanes(laneGap) {
      return [
        model.position.x - 2 * laneGap,
        model.position.x - laneGap,
        model.position.x + laneGap,
        model.position.x + 2 * laneGap,
      ]
    },
  }

  const collisionHandler = () => {
    setPage('game')
  }

  const [plane] = useBox(() => ({
    args: [6, 11, 0.0001],
    rotation: [-Math.PI / 2, 0, 0],
    position: [model.position.x, model.position.y, model.position.z - 5],
    onCollide: (e) => {
      if (e.body.constructor.name !== 'InstancedMesh') collisionHandler()
    },
  }))

  useEffect(
    () => (page === 'game' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, model.options)

  // eslint-disable-next-line react/prop-types
  const Fireball = () => {
    const fireballRef = useRef(null)
    const [fireballMesh, fireballApi] = useBox(() => ({
      mass: 1,
      args: [0.2, 0.2, 0.2],
      rotation: [-Math.PI / 2, 0, 0],
      position: [...model.position],
      type: 'Dynamic',
      onCollide: (e) => {
        if (e.body.name === 'Pikachu') {
          console.log('collided')
          setIsLost(true)
        }
        if (e.body.name === 'Respawn Line') {
          fireballApi.position.set(
            game.lanes(game.laneGap)[Math.round(Math.random() * 2)],
            // eslint-disable-next-line react/prop-types
            0.1,
            // eslint-disable-next-line react/prop-types
            model.position.z - Math.random() * 4
          )
        }
      },
    }))

    useFrame(() => {
      fireballApi.rotation.set(0, 0, 0)
      fireballApi.velocity.set(0, 0, -4)
    })

    useEffect(() => {
      spawnLine.current.name = 'Respawn Line'
      console.log(fireballApi)
    }, [])

    return (
      <mesh ref={fireballRef}>
        <mesh ref={fireballMesh}>
          <boxBufferGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial />
        </mesh>
      </mesh>
    )
  }

  const [spawnLine] = useBox(() => ({
    args: [6, 2, 0.2], // width, height, depth
    position: [model.position.x, 0, model.position.z - 10],
  }))

  const Fireballs = () => {
    const fireballs = [0, 1, 2, 3]
    return fireballs.map(() => (
      <Fireball position={[model.position.x, 0.1, model.position.z - 1]} />
    ))
  }

  return (
    <mesh>
      <mesh ref={plane} />
      <mesh ref={spawnLine}>
        <boxBufferGeometry args={[7.5, 0.1, 0.2]} />
        <meshStandardMaterial />
      </mesh>
      <primitive
        rotation={[...model.rotation]}
        position={[...model.position]}
        scale={0.014}
        object={gltf.scene}
        dispose={null}
      />
      {isActive && <Fireballs />}
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={2}
        opacity={0.15}
      />
    </mesh>
  )
}

Charizard.defaultProps = {
  page: '',
  setPage: null,
  setGameScreenData: null,
}

Charizard.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
  setGameScreenData: PropTypes.func,
}

export default Charizard
