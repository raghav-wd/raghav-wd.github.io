import { useGLTF } from '@react-three/drei'

const SunsetGirl = () => {
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
  const Trees = () => {
    const trees = []
    for (let i = 0; i < 140; i += 1) {
      trees.push(<RandTree />)
    }
    return trees
  }

  return <Trees />
}

export default SunsetGirl
