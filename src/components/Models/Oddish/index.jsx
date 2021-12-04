import * as THREE from 'three'
import { useGLTF, MeshWobbleMaterial } from '@react-three/drei'

const Oddish = () => {
  const { nodes, materials } = useGLTF('./libs/oddish/scene.gltf')

  const model = {
    position: new THREE.Vector3(10, 0, 9),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
  }

  return (
    <group>
      <mesh position={[...model.position]} rotation={[...model.rotation]}>
        <boxBufferGeometry args={[1.6, 0.5, 1.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <group
        position={[model.position.x, 0.8, model.position.z]}
        rotation={[...model.rotation]}
        dispose={null}
      >
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.2}>
          <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
              <mesh
                geometry={nodes.Oddish002_Oddish_0.geometry}
                material={nodes.Oddish002_Oddish_0.material}
              />
              <mesh geometry={nodes.Oddish002_Oddish_0001.geometry}>
                <MeshWobbleMaterial
                  factor={0.4}
                  color="#8bc34a"
                  // map={nodes.Oddish002_Oddish_0001.material}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

export default Oddish
