import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

const AshKetchum = () => {
  const gltf = useGLTF('./libs/ash_ketchum/scene.gltf')
  const position = new THREE.Vector3(10, 0, 5)

  return (
    <mesh>
      <mesh position={[...position]} rotation={[0, Math.PI / 2, 0]}>
        <boxBufferGeometry args={[3.6, 0.01, 3.6]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
      <primitive
        rotation={[0, -Math.PI / 2, 0]}
        position={[...position]}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default AshKetchum
