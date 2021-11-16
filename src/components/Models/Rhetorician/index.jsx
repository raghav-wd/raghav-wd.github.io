import { useGLTF } from '@react-three/drei'

const Rhetorician = () => {
  const gltf = useGLTF('./libs/rhetorician/scene.gltf')

  return (
    <mesh>
      <mesh rotation={[0, (6 * Math.PI) / 5, 0]} position={[4, 2, 21]}>
        <planeBufferGeometry args={[7, 5]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        rotation={[0, (6 * Math.PI) / 5, 0]}
        position={[4, 0, 20]}
        scale={0.5}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default Rhetorician
