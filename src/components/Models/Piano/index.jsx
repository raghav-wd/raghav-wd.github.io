import * as THREE from 'three'
import { useGLTF, Shadow } from '@react-three/drei'

const Piano = () => {
  const gltf = useGLTF('./libs/chunky_synth/scene.gltf')
  const jigglypuff = useGLTF('./libs/jigllypuff/scene.gltf')

  const model = {
    position: new THREE.Vector3(12, 0.2, 16),
    rotation: new THREE.Vector3(0, -Math.PI / 2, 0),
  }

  return (
    <mesh>
      <mesh
        position={[model.position.x, 0, model.position.z]}
        rotation={[...model.rotation]}
      >
        <boxBufferGeometry args={[3.6, 0.5, 3.6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <primitive
        rotation={[0, Math.PI * 0.8, 0]}
        position={[model.position.x, -0.4, 16]}
        scale={0.4}
        object={gltf.scene}
        dispose={null}
      />
      <primitive
        rotation={[0, -Math.PI / 1.5, 0]}
        position={[model.position.x + 1, 0.2, model.position.z - 1.6]}
        scale={0.1}
        object={jigglypuff.scene}
        dispose={null}
      />
      <Shadow
        position={[model.position.x, 0.001, model.position.z]}
        rotation-x={-Math.PI / 2}
        scale={6}
        opacity={0.15}
      />
    </mesh>
  )
}

export default Piano
