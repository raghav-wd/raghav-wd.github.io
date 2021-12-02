import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { Shadow } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Piano = () => {
  const gltf = useLoader(GLTFLoader, './libs/chunky_synth/scene.gltf')
  const jigglypuff = useLoader(GLTFLoader, './libs/jigllypuff/scene.gltf')

  const model = {
    position: new THREE.Vector3(12, 0.2, 14),
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
        position={[model.position.x, -0.4, model.position.z]}
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

/*
Preloading assets
https://docs.pmnd.rs/react-three-fiber/API/hooks#pre-loading-assets
*/
useLoader.preload(GLTFLoader, './libs/chunky_synth/scene.gltf')
useLoader.preload(GLTFLoader, './libs/jigllypuff/scene.gltf')

export default Piano
