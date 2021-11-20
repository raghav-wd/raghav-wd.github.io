import * as THREE from 'three'
import { useGLTF, Text } from '@react-three/drei'
import BillboardHoarding from '../BillboardHoarding'

const AshKetchum = () => {
  const gltf = useGLTF('./libs/ash_ketchum/scene.gltf')
  const position = new THREE.Vector3(10, 0, 5)

  return (
    <mesh>
      <mesh position={[...position]} rotation={[0, Math.PI / 2, 0]}>
        <boxBufferGeometry args={[3.6, 0.01, 3.6]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
      <BillboardHoarding
        position={[position.x, 0, position.z + 2]}
        scale={0.2}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Text
        color="#212121"
        position={[position.x - 0.2, 1.5, position.z + 1.8]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[0, -Math.PI / 2, 0]}
      >
        Rock&apos;n Roll
      </Text>
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
