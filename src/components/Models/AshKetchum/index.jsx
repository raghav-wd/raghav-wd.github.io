import * as THREE from 'three'
import { useGLTF, Text } from '@react-three/drei'
import BillboardHoarding from '../BillboardHoarding'

const AshKetchum = () => {
  const gltf = useGLTF('./libs/ash_ketchum/scene.gltf')
  const model = {
    position: new THREE.Vector3(10, 0, 5),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
  }

  return (
    <mesh>
      <mesh position={[...model.position]} rotation={[...model.rotation]}>
        <boxBufferGeometry args={[3.6, 0.01, 3.6]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>
      <BillboardHoarding
        position={[model.position.x, 0, model.position.z + 2]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
      <Text
        color="#212121"
        position={[model.position.x - 0.2, 1.5, model.position.z + 1.8]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Rock&apos;n Roll
      </Text>
      <primitive
        rotation={[...model.rotation]}
        position={[...model.position]}
        object={gltf.scene}
        dispose={null}
      />
    </mesh>
  )
}

export default AshKetchum
