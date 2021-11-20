import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

const Snorlax = () => {
  const gltf = useGLTF('./libs/snorlax/scene.gltf')
  const position = new THREE.Vector3(10, 0.2, 20)
  return (
    <mesh>
      <mesh
        position={[position.x, 0, position.z]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxBufferGeometry args={[3.6, 0.5, 3.6]} />
        <meshBasicMaterial color="white" />
      </mesh>
      <primitive
        rotation={[0, Math.PI, 0]}
        position={[...position]}
        scale={1.4}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default Snorlax
