import { useGLTF } from '@react-three/drei'

const SpruceTree = () => {
  const gltf = useGLTF('./libs/spruce_tree/scene.gltf')

  return (
    <primitive
      rotation={[0, Math.PI / 2, 0]}
      position={[10, 0.001, 20]}
      scale={1}
      object={gltf.scene}
      dispose={null}
    />
  )
}

export default SpruceTree
