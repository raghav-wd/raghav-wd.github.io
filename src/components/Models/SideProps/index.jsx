import { Shadow } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

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
    for (let x = 0; x < 1; x += 1) randCords.push(randCord())
    return (
      <group dispose={null}>
        <mesh
          geometry={treeNodes.pine_leaves005_dark_leaves_0.geometry}
          material={treeMaterial.dark_leaves}
          position={[randCords[0].x, 2.51, randCords[0].z]}
          rotation={[-Math.PI / 2, 0, 2 * Math.PI * Math.random()]}
          scale={[0.03, 0.03, 0.06]}
        />
        <mesh
          geometry={treeNodes.tree_trunk005_dark_tree_trunk_0.geometry}
          material={treeMaterial.dark_tree_trunk}
          position={[randCords[0].x, 0.61, randCords[0].z]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.03, 0.03, 0.03]}
        />
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
    const randCord = () => {
      const x = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      return { x, z }
    }
    const randCords = []
    for (let x = 0; x < 1; x += 1) randCords.push(randCord())

    return (
      <group dispose={null}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.02}
          position={[randCords[0].x, 0, randCords[0].z]}
          geometry={grassandrockNodes.Grass2_Grass1_1001_0.geometry}
          material={grassandrockNodes.Grass2_Grass1_1001_0.material}
        />
        <Shadow
          position={[randCords[0].x, 0.001, randCords[0].z]}
          rotation-x={-Math.PI / 2}
          scale={0.2}
          opacity={0.2}
        />
      </group>
    )
  }

  const RandRock = () => {
    const randCord = () => {
      const x = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      return { x, z }
    }
    const randCords = []
    for (let x = 0; x < 1; x += 1) randCords.push(randCord())

    return (
      <group dispose={null}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.4}
          position={[randCords[0].x, 0, randCords[0].z]}
          geometry={grassandrockNodes.Rock2_Rock1_1_0.geometry}
          material={grassandrockNodes.Rock2_Rock1_1_0.material}
        />
        <Shadow
          position={[randCords[0].x, 0.001, randCords[0].z]}
          rotation-x={-Math.PI / 2}
          scale={0.36}
          opacity={0.15}
        />
      </group>
    )
  }

  /*
  Generating sideprops
  */

  const Trees = () => {
    const trees = []
    for (let i = 0; i < 140; i += 1) {
      trees.push(<RandTree key={i} />)
    }
    return trees
  }

  const RandRocks = () => {
    const rocks = []
    for (let i = 0; i < 80; i += 1) {
      rocks.push(<RandRock key={i} />)
    }
    return rocks
  }

  const Grasses = () => {
    const grasses = []
    for (let i = 0; i < 60; i += 1) {
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
