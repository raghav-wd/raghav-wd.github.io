import * as THREE from 'three'
import { useGLTF, Shadow, Text } from '@react-three/drei'
import BillboardHoarding from '../BillboardHoarding'

const Juice = () => {
  const gltf = useGLTF('./libs/juice_cup/scene.gltf')
  const squirtle = useGLTF('./libs/squirtle/scene.gltf')

  const model = {
    position: new THREE.Vector3(10, 1.2, 20),
    rotation: new THREE.Vector3(0, -Math.PI / 1.4, 0),
  }

  return (
    <mesh>
      <mesh
        position={[model.position.x, 0, model.position.z]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <boxBufferGeometry args={[3.6, 0.5, 3.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        position={[...model.position]}
        rotation={[...model.rotation]}
        scale={1}
        object={gltf.scene}
        dispose={null}
      />
      <primitive
        rotation={[0, 1.2 * Math.PI, 0]}
        position={[model.position.x - 1, 0.2, model.position.z]}
        scale={0.02}
        object={squirtle.scene}
        dispose={null}
      />
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={6}
        opacity={0.15}
      />
      <Text
        color="#212121"
        position={[model.position.x + 2, 1.5, model.position.z - 7.2]}
        fontSize={0.2}
        letterSpacing={0.2}
        fillOpacity={0}
        outlineColor="#212121"
        outlineWidth={0.01}
        rotation={[...model.rotation]}
      >
        Hobbies
      </Text>
      <BillboardHoarding
        position={[model.position.x + 2, 0, model.position.z - 7]}
        scale={0.2}
        rotation={[...model.rotation]}
      />
    </mesh>
  )
}

export default Juice
