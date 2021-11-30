import { useTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react/cjs/react.development'

const Projects = () => {
  // eslint-disable-next-line react/prop-types
  const Billboard = ({ texture, color = 0xffffff, ...props }) => {
    const bannerRef = useRef(null)

    useEffect(() => {
      bannerRef.current.position.z += 0.051
    }, [])

    return (
      <group {...props}>
        <mesh>
          <boxBufferGeometry args={[1.1, 1.8, 0.1]} />
          <meshStandardMaterial color={color} />
        </mesh>
        <mesh ref={bannerRef}>
          <planeBufferGeometry args={[1, 1.7]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    )
  }
  const musifireTexture = useTexture('./projects/musifire.jpg')
  const skimaTexture = useTexture('./projects/skima.jpg')
  const portfolioTexture = useTexture('./projects/portfolio.jpg')
  const boyWithSkyTexture = useTexture('./projects/boy_with_sky.jpg')

  return (
    <group>
      <Billboard
        texture={musifireTexture}
        position={[0, 0.9, 0]}
        rotation={[0, Math.PI * 0.7, 0]}
      />
      <Billboard
        texture={skimaTexture}
        position={[-1, 0.9, 0]}
        rotation={[0, Math.PI * 0.7, 0]}
      />
      <Billboard
        texture={portfolioTexture}
        position={[1, 0.9, 0]}
        rotation={[0, Math.PI * 0.7, 0]}
        color={0x212121}
      />
      <Billboard
        texture={boyWithSkyTexture}
        position={[-2, 0.9, 0]}
        rotation={[0, Math.PI * 0.7, Math.PI / 2]}
        color={0x212121}
      />
    </group>
  )
}

export default Projects
