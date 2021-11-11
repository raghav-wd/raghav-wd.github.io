import { useGLTF } from '@react-three/drei'

const SunsetGirl = () => {
  const gltf = useGLTF('./libs/sunset_walking_low_poly_girl_rigged/scene.gltf')

  return (
    <primitive
      rotation={[0, Math.PI / 2, 0]}
      position={[0, 0.001, 20]}
      scale={0.8}
      object={gltf.scene}
      dispose={null}
    />
  )
}

export default SunsetGirl
