import { useGLTF } from '@react-three/drei'

const Skybox = () => {
  const gltf = useGLTF('./libs/sky_restro/scene.gltf')

  return (
    <mesh>
      <primitive object={gltf.scene} scale={2} dispose={null} />
    </mesh>
  )
}

useGLTF.preload('./libs/sky_restro/scene.gltf')

export default Skybox
