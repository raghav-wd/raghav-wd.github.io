import {
  Torus,
  Box,
  Shadow,
  Text,
  Instance,
  Instances,
} from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'

const SideProps = () => {
  /*
  Loading assets
  */

  const { nodes: treeNodes, materials: treeMaterial } = useLoader(
    GLTFLoader,
    './libs/tree/scene.gltf'
  )

  const { nodes: electricPoleNodes, materials: electricPoleMaterials } =
    useLoader(GLTFLoader, './libs/electricpole/scene.gltf')

  const { nodes: grassandrockNodes } = useLoader(
    GLTFLoader,
    './libs/low_poly_trees_grass_and_rocks/scene.gltf'
  )

  const RandTree = () => {
    const randCord = () => {
      const r = 50
      const θ = 1 * Math.PI * Math.random() - Math.PI / 2
      const x = r * Math.sin(θ)
      const z = r * Math.cos(θ) + Math.random() * 20
      return { x, z }
    }
    const randCords = []
    for (let x = 0; x < 140; x += 1) randCords.push(randCord())
    return (
      <group dispose={null}>
        <Instances
          limit={140}
          geometry={treeNodes.pine_leaves005_dark_leaves_0.geometry}
          material={treeMaterial.dark_leaves}
        >
          {randCords.map((cords, i) => (
            <Instance
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              scale={[0.03, 0.03, 0.06]}
              position={[cords.x, 2.51, cords.z]}
              rotation={[-Math.PI / 2, 0, 0]}
            />
          ))}
        </Instances>
        <Instances
          limit={140}
          geometry={treeNodes.tree_trunk005_dark_tree_trunk_0.geometry}
          material={treeMaterial.dark_tree_trunk}
        >
          {randCords.map((cords, i) => (
            <Instance
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              scale={[0.03, 0.03, 0.03]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[cords.x, 0.61, cords.z]}
            />
          ))}
        </Instances>
      </group>
    )
  }

  // eslint-disable-next-line react/prop-types
  const ElectricPole = ({ x }) => (
    <group position={[x, 0, 50]} scale={0.26} dispose={null}>
      <group dispose={null}>
        <group rotation={[-Math.PI / 2, 0, 0]} />
        <group
          position={[0, 17.53, -1.28]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.1, 20, 0.1]}
        >
          <mesh
            geometry={electricPoleNodes.Cylinder001_1.geometry}
            material={electricPoleMaterials.elecpole1_ma}
          />
          <mesh
            geometry={electricPoleNodes.Cylinder001_2.geometry}
            material={electricPoleMaterials['elecpole1_ma.000']}
          />
        </group>
      </group>
    </group>
  )

  const RandGrass = () => {
    const randCords = []
    const nos = 60
    for (let i = 0; i < nos; i += 1) {
      randCords.push({
        x: (Math.random() - 0.5) * 50,
        y: 0,
        z: (Math.random() - 0.5) * 50,
      })
    }

    return (
      <Instances
        limit={nos}
        geometry={grassandrockNodes.Grass2_Grass1_1001_0.geometry}
        material={grassandrockNodes.Grass2_Grass1_1001_0.material}
      >
        {randCords.map((cords, i) => (
          <Instance
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            scale={0.02}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[cords.x, 0, cords.z]}
          />
        ))}
      </Instances>
    )
  }

  const RandRock = () => {
    const randCords = []
    const nos = 80
    for (let i = 0; i < nos; i += 1) {
      randCords.push({
        x: (Math.random() - 0.5) * 50,
        y: 0,
        z: (Math.random() - 0.5) * 50,
      })
    }

    return (
      <Instances
        limit={nos}
        geometry={grassandrockNodes.Rock2_Rock1_1_0.geometry}
        material={grassandrockNodes.Rock2_Rock1_1_0.material}
      >
        {randCords.map((cords, i) => (
          <Instance
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            scale={0.4}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[cords.x, 0, cords.z]}
          />
        ))}
      </Instances>
    )
  }

  const whiteMaterial = useMemo(() => new THREE.MeshBasicMaterial(), [])
  const Pokeball = () => {
    const [scale, setScale] = useState(0)
    const scaleSpring = useSpring({
      scale,
      config: { mass: 1, tension: 180, friction: 12, bounce: 2 },
    })
    const boxGeom = useMemo(
      () => new THREE.BoxBufferGeometry(0.8, 0.0005, 0.2),
      []
    )

    useEffect(() => {
      const timeout = setTimeout(() => setScale(1), 1000)
      return () => clearTimeout(timeout)
    }, [])

    return (
      <a.mesh {...scaleSpring}>
        <Torus
          args={[1, 0.05, 2, 100]}
          material={whiteMaterial}
          position={[0, 0.001, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Torus
          args={[0.2, 0.05, 2, 100]}
          material={whiteMaterial}
          position={[0, 0.001, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Torus
          args={[0, 0.05, 2, 100]}
          material={whiteMaterial}
          position={[0, 0.001, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          geometry={boxGeom}
          material={whiteMaterial}
          position={[0.6, 0, 0]}
        />
        <mesh
          geometry={boxGeom}
          material={whiteMaterial}
          position={[-0.6, 0, 0]}
        />
      </a.mesh>
    )
  }

  const LetsGo = () => {
    const [position, setPosition] = useState([0, 0.001, -4])
    const positionSpring = useSpring({
      position,
      config: { mass: 1, tension: 180, friction: 12 },
    })

    useEffect(() => {
      const timeout = setTimeout(() => setPosition([0, 0.001, -2]), 1800)
      return () => clearTimeout(timeout)
    }, [])

    return (
      <a.group {...positionSpring}>
        <Text
          color="white"
          fontSize={0.2}
          letterSpacing={0.2}
          fillOpacity={0}
          outlineColor="white"
          outlineWidth={0.01}
          rotation={[Math.PI / 2, Math.PI, 0]}
        >
          Let&apos;s Go!
        </Text>
      </a.group>
    )
  }

  const KeyTooltip = () => {
    const squareGeo = useMemo(
      () => new THREE.TorusBufferGeometry(0.8, 0.05, 2, 4),
      []
    )
    const KeyP = () => {
      const [tooltipText, setTooltipText] = useState('Press E')
      useEffect(() => {
        const timeout = setInterval(() => {
          setTooltipText((tt) => (tt === 'Press E' ? 'To Dance' : 'Press E'))
        }, 2000)
        return () => clearInterval(timeout)
      }, [])
      return (
        <group position={[7, 0.5, 6]} rotation={[Math.PI / 2, 0.001, 0]}>
          <mesh geometry={squareGeo} material={whiteMaterial} />
          <mesh
            geometry={squareGeo}
            material={whiteMaterial}
            position={[0, 0.2, 0]}
            fillOpacity={0.1}
          />

          <Text
            position={[0, 0, -0.3]}
            color="white"
            fontSize={0.15}
            letterSpacing={0.2}
            fillOpacity={0}
            outlineColor="white"
            outlineWidth={0.01}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            {tooltipText}
          </Text>
        </group>
      )
    }

    const KeySpace = () => {
      const [tooltipText, setTooltipText] = useState('Press Space')
      useEffect(() => {
        const timeout = setInterval(() => {
          setTooltipText((tt) =>
            tt === 'Press Space' ? 'To Jump' : 'Press Space'
          )
        }, 2000)
        return () => clearInterval(timeout)
      }, [])
      return (
        <group position={[-7, 0.5, 0]} rotation={[Math.PI / 2, 0.001, 0]}>
          <mesh geometry={squareGeo} material={whiteMaterial} />
          <mesh
            geometry={squareGeo}
            material={whiteMaterial}
            position={[0, 0.2, 0]}
            fillOpacity={0.1}
          />

          <Text
            position={[0, 0, -0.3]}
            color="white"
            fontSize={0.15}
            letterSpacing={0.2}
            fillOpacity={0}
            outlineColor="white"
            outlineWidth={0.01}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            {tooltipText}
          </Text>
        </group>
      )
    }

    const KeyR = () => {
      const [tooltipText, setTooltipText] = useState('Press R')
      useEffect(() => {
        const timeout = setInterval(() => {
          setTooltipText((tt) => (tt === 'Press R' ? 'To Reset' : 'Press R'))
        }, 2000)
        return () => clearInterval(timeout)
      }, [])
      return (
        <group position={[-3, 0.5, 22]} rotation={[Math.PI / 2, 0.001, 0]}>
          <mesh geometry={squareGeo} material={whiteMaterial} />
          <mesh
            geometry={squareGeo}
            material={whiteMaterial}
            position={[0, 0.2, 0]}
            fillOpacity={0.1}
          />

          <Text
            position={[0, 0, -0.3]}
            color="white"
            fontSize={0.15}
            letterSpacing={0.2}
            fillOpacity={0}
            outlineColor="white"
            outlineWidth={0.01}
            rotation={[Math.PI / 2, 0, Math.PI]}
          >
            {tooltipText}
          </Text>
        </group>
      )
    }

    return (
      <mesh>
        <KeyP />
        <KeyR />
        <KeySpace />
      </mesh>
    )
  }

  /*
  Generating sideprops
  */

  const Trees = () => {
    const trees = []
    for (let i = 0; i < 1; i += 1) {
      trees.push(<RandTree key={i} />)
    }
    return trees
  }

  const RandRocks = () => {
    const rocks = []
    for (let i = 0; i < 1; i += 1) {
      rocks.push(<RandRock key={i} />)
    }
    return rocks
  }

  const Grasses = () => {
    const grasses = []
    for (let i = 0; i < 1; i += 1) {
      grasses.push(<RandGrass key={i} />)
    }
    return grasses
  }

  const ElectricPoles = () => {
    const electricpoles = []
    const dist = 10

    for (let i = 0; i < 5; i += 1) {
      electricpoles.push(<ElectricPole x={i * dist} key={i} />)
      electricpoles.push(<ElectricPole x={-i * dist} key={i + 5} />)
    }
    return electricpoles
  }

  return (
    <mesh>
      <Trees />
      <Grasses />
      <RandRocks />
      <ElectricPoles />
      <Pokeball />
      <LetsGo />
      <KeyTooltip />
    </mesh>
  )
}

/*
Preloading assets
https://docs.pmnd.rs/react-three-fiber/API/hooks#pre-loading-assets
*/

useLoader.preload(GLTFLoader, './libs/tree/scene.gltf')
useLoader.preload(GLTFLoader, './libs/electricpole/scene.gltf')
useLoader.preload(
  GLTFLoader,
  './libs/low_poly_trees_grass_and_rocks/scene.gltf'
)

export default SideProps
