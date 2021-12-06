import PropTypes from 'prop-types'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Shadow } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useBox } from '@react-three/cannon'
import { useModelTransition } from '../../hooks'

const Charizard = ({ page, setPage, isLost, setIsLost }) => {
  const [isActive, setIsActive] = useState(false)

  const gltf = useGLTF('./libs/charizard/scene.gltf')

  const model = {
    position: new THREE.Vector3(-9, 0, 30),
    rotation: new THREE.Vector3(0, -Math.PI, 0),
    options: {
      focusOnPosition: null,
      animateToPosition: null,
      fov: 26,
    },
  }
  model.options.focusOnPosition = new THREE.Vector3(
    model.position.x,
    model.position.y + 2,
    model.position.z
  )
  model.options.animateToPosition = new THREE.Vector3(
    model.position.x,
    model.position.y + 2.5,
    model.position.z - 20
  )

  const game = {
    fireball: {
      speed: -4,
    },
    laneGap: 1,
    lanes(laneGap) {
      return [
        model.position.x - 2 * laneGap,
        model.position.x - laneGap,
        model.position.x,
        model.position.x + laneGap,
        model.position.x + 2 * laneGap,
      ]
    },
    playArea: new THREE.Vector3(11, 0, 11),
  }

  const collisionHandler = () => {
    setPage('game')
  }

  const [plane] = useBox(() => ({
    args: [5, 10, 0.0001],
    rotation: [-Math.PI / 2, 0, 0],
    position: [model.position.x, model.position.y, model.position.z - 5],
    onCollide: (e) => {
      try {
        if (e.body.name === 'Pikachu') collisionHandler()
      } catch (exception) {
        // empty
      }
    },
  }))

  useEffect(
    () => (page === 'game' ? setIsActive(true) : setIsActive(false)),
    [page]
  )

  useModelTransition(isActive, model.options)

  // eslint-disable-next-line react/prop-types
  const Fireball = () => {
    const { nodes, materials } = useGLTF('./libs/fireball_vfx/scene.gltf')
    const fireballRef = useRef(null)
    const fb = useRef(null)
    const fireballShadow = useRef(null)
    const [fireballMesh, fireballApi] = useBox(() => ({
      mass: 1,
      args: [0.62, 0.62, 0.62],
      rotation: [-Math.PI / 2, 0, 0],
      position: [
        game.lanes(game.laneGap)[Math.round(Math.random() * 4)],
        // eslint-disable-next-line react/prop-types
        0.1,
        // eslint-disable-next-line react/prop-types
        model.position.z - Math.random() * 4,
      ],
      type: 'Dynamic',
      onCollide: (e) => {
        if (e.body.name === 'Pikachu') {
          setIsLost(true)
        }
        if (e.body.name === 'Respawn Line') {
          fireballApi.position.set(
            game.lanes(game.laneGap)[Math.round(Math.random() * 4)],
            // eslint-disable-next-line react/prop-types
            0.1,
            // eslint-disable-next-line react/prop-types
            model.position.z - Math.random() * 4 - 0.1
          )
        }
      },
    }))

    useFrame(() => {
      fireballApi.rotation.set(0, 0, 0)
      fireballApi.velocity.set(0, 0, game.fireball.speed)
      fb.current.rotation.z -= 0.1
      fireballMesh.current.getWorldPosition(fireballShadow.current.position)
      fireballShadow.current.position.y = -0.17
    })

    useEffect(() => {
      fireballRef.current.position.y = 0.19
    }, [])

    return (
      <mesh ref={fireballRef}>
        <group ref={fireballMesh} scale={0.4} dispose={null}>
          <group ref={fb} rotation={[-Math.PI / 2, 0, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
                <mesh
                  geometry={nodes['����������_����������������_0'].geometry}
                  material={materials.material}
                />
              </group>
              <group
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[90.48, 90.48, 90.48]}
              >
                <mesh
                  geometry={
                    nodes['����������001_����������������001_0'].geometry
                  }
                  material={materials['.001']}
                />
              </group>
            </group>
          </group>
        </group>
        <Shadow
          ref={fireballShadow}
          rotation-x={-Math.PI / 2}
          scale={1}
          opacity={0.12}
        />
      </mesh>
    )
  }

  const [frontFoulLine, frontFoulLineApi] = useBox(() => ({
    args: [5.6, 2, 0.2], // width, height, depth
  }))

  const [rearSpawnLine, rearSpawnLineApi] = useBox(() => ({
    args: [5.6, 2, 0.2], // width, height, depth
  }))

  const [leftFoulLine, leftFoulLineApi] = useBox(() => ({
    args: [0.2, 2, 10], // width, height, depth
  }))

  const [rightFoulLine, rightFoulLineApi] = useBox(() => ({
    args: [0.2, 2, 10], // width, height, depth
  }))

  useEffect(() => {
    if (isActive && !isLost) {
      frontFoulLine.current.visible = true
      rearSpawnLine.current.visible = true
      leftFoulLine.current.visible = true
      rightFoulLine.current.visible = true
      frontFoulLineApi.position.set(model.position.x, 0, model.position.z)
      leftFoulLineApi.position.set(
        model.position.x + 2.7,
        0,
        model.position.z - 5
      )
      rightFoulLineApi.position.set(
        model.position.x - 2.7,
        0,
        model.position.z - 5
      )
      rearSpawnLineApi.position.set(
        model.position.x,
        0,
        model.position.z - 10.2
      )
    } else {
      frontFoulLine.current.visible = false
      rearSpawnLine.current.visible = false
      leftFoulLine.current.visible = false
      rightFoulLine.current.visible = false
      frontFoulLineApi.position.set(model.position.x, 2, model.position.z)
      leftFoulLineApi.position.set(
        model.position.x + 2.7,
        2,
        model.position.z - 5
      )
      rightFoulLineApi.position.set(
        model.position.x - 2.7,
        2,
        model.position.z - 5
      )
      rearSpawnLineApi.position.set(
        model.position.x,
        2,
        model.position.z - 10.2
      )
    }
  }, [isActive, isLost])

  useEffect(() => {
    rearSpawnLine.current.name = 'Respawn Line'
  }, [])

  const Fireballs = () => {
    const fireballs = [0, 1, 2, 3]
    return fireballs.map(() => (
      <Fireball position={[model.position.x, 0.1, model.position.z - 1]} />
    ))
  }

  return (
    <mesh>
      <mesh ref={plane} />
      <mesh position={[model.position.x, 0, model.position.z - 10.2]}>
        <boxBufferGeometry args={[5.6, 0.1, 0.2]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={frontFoulLine}>
        <boxBufferGeometry args={[5.6, 0.1, 0.2]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={rearSpawnLine}>
        <boxBufferGeometry args={[5.6, 0.1, 0.2]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={leftFoulLine}>
        <boxBufferGeometry args={[0.2, 0.1, 10]} />
        <meshStandardMaterial />
      </mesh>
      <mesh ref={rightFoulLine}>
        <boxBufferGeometry args={[0.2, 0.1, 10]} />
        <meshStandardMaterial />
      </mesh>
      <primitive
        rotation={[...model.rotation]}
        position={[...model.position]}
        scale={0.018}
        object={gltf.scene}
        dispose={null}
      />
      {isActive && !isLost && <Fireballs />}
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
  isLost: false,
  setIsLost: null,
}

Charizard.propTypes = {
  page: PropTypes.string,
  setPage: PropTypes.func,
  isLost: PropTypes.bool,
  setIsLost: PropTypes.func,
}

useGLTF.preload([
  './libs/charizard/scene.gltf',
  './libs/fireball_vfx/scene.gltf',
])

export default Charizard
