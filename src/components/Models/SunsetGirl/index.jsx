import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

const SunsetGirl = () => {
  const gltf = useGLTF('./libs/sunset_walking_low_poly_girl_rigged/scene.gltf')
  const { ref, mixer, names, actions, clips } = useAnimations(gltf.animations)

  useEffect(() => {
    console.log(names)
    actions.Animation.play()
  })

  return (
    <primitive
      ref={ref}
      rotation={[0, Math.PI / 2, 0]}
      position={[0, 0.001, 20]}
      scale={0.8}
      object={gltf.scene}
      dispose={null}
    />
  )
}

export default SunsetGirl
