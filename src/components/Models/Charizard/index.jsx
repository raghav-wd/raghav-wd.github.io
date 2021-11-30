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
    laneGap: 0.9,
    lanes(laneGap) {
      return [
        model.position.x - 2 * laneGap,
        model.position.x - laneGap,
        model.position.x,
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
    const { nodes, materials } = useGLTF('./libs/fireball_vfx/scene.gltf')
    const fireballRef = useRef(null)
    const fb = useRef(null)
    const fireballShadow = useRef(null)
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
            game.lanes(game.laneGap)[Math.round(Math.random() * 3)],
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
      fb.current.rotation.z -= 0.1
      fireballMesh.current.getWorldPosition(fireballShadow.current.position)
      fireballShadow.current.position.y = -0.17
    })

    useEffect(() => {
      spawnLine.current.name = 'Respawn Line'
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
