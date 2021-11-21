import * as THREE from 'three'
import { useGLTF, Shadow } from '@react-three/drei'

const Juice = () => {
  const gltf = useGLTF('./libs/juice_cup/scene.gltf')
  const squirtle = useGLTF('./libs/squirtle/scene.gltf')

  const position = new THREE.Vector3(10, 1.2, 20)
  return (
    <mesh>
      <mesh
        position={[position.x, 0, position.z]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
        castShadow
      >
        <boxBufferGeometry args={[3.6, 0.5, 3.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        rotation={[0, Math.PI / 1.5, 0]}
        position={[...position]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
      <primitive
        rotation={[0, 1.2 * Math.PI, 0]}
        position={[position.x - 1, 0.2, position.z]}
        scale={0.02}
        object={squirtle.scene}
        dispose={null}
      />
      <Shadow
        position={[position.x, 0.001, position.z]}
        rotation-x={-Math.PI / 2}
        scale={6}
        opacity={0.15} // Alpha (default:0.5)
      />
    </mesh>
  )
}

export default Juice
