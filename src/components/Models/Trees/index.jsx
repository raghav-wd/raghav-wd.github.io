import { useGLTF, Shadow } from '@react-three/drei'

const Trees = () => {
  const RandTree = () => {
    const { nodes, materials } = useGLTF('./libs/tree/scene.gltf')
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
          geometry={nodes.pine_leaves005_dark_leaves_0.geometry}
          material={materials.dark_leaves}
          position={[randCords[0].x, 2.51, randCords[0].z]}
          rotation={[-Math.PI / 2, 0, 2 * Math.PI * Math.random()]}
          scale={[0.03, 0.03, 0.06]}
        />
        <mesh
          geometry={nodes.tree_trunk005_dark_tree_trunk_0.geometry}
          material={materials.dark_tree_trunk}
          position={[randCords[0].x, 0.61, randCords[0].z]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[0.03, 0.03, 0.03]}
        />
      </group>
    )
  }

  const RandGrass = () => {
    const { nodes } = useGLTF(
      './libs/low_poly_trees_grass_and_rocks/scene.gltf'
    )
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
          geometry={nodes.Grass2_Grass1_1001_0.geometry}
          material={nodes.Grass2_Grass1_1001_0.material}
        />
        {/* <mesh
          geometry={nodes.Rock2_Rock1_1_0.geometry}
          material={nodes.Rock2_Rock1_1_0.material}
        /> */}
        <Shadow
          position={[randCords[0].x, 0.001, randCords[0].z]}
          rotation-x={-Math.PI / 2}
          scale={0.2}
          opacity={0.2} // Alpha (default:0.5)
        />
      </group>
    )
  }
  const RandRock = () => {
    const { nodes } = useGLTF(
      './libs/low_poly_trees_grass_and_rocks/scene.gltf'
    )
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
          geometry={nodes.Rock2_Rock1_1_0.geometry}
          material={nodes.Rock2_Rock1_1_0.material}
        />
        <Shadow
          position={[randCords[0].x, 0.001, randCords[0].z]}
          rotation-x={-Math.PI / 2}
          scale={0.36}
          opacity={0.15} // Alpha (default:0.5)
        />
      </group>
    )
  }
  const Tree = () => {
    const trees = []
    for (let i = 0; i < 140; i += 1) {
      trees.push(<RandTree />)
    }
    return trees
  }

  const RandRocks = () => {
    const rocks = []
    for (let i = 0; i < 80; i += 1) {
      rocks.push(<RandRock />)
    }
    return rocks
  }

  const Grass = () => {
    const grasses = []
    for (let i = 0; i < 60; i += 1) {
      grasses.push(<RandGrass />)
    }
    return grasses
  }

  return (
    <mesh>
      <Tree />
      <Grass />
      <RandRocks />
    </mesh>
  )
}

export default Trees
